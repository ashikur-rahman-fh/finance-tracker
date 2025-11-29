from datetime import datetime

from django.shortcuts import render
from django.utils.dateparse import parse_date

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from .models import Account, Category, Transaction
from .serializer import (
    AccountSerializer,
    CategorySerializer,
    TransactionSerializer,
    TransactionROSerializer
)
from .service import apply_transaction_effect

class AccountListCreateAPIView(APIView):
    def get(self, request):
        accounts = Account.objects.filter(is_active=True)
        serializer = AccountSerializer(accounts, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AccountSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AccountDetailAPIView(APIView):
    def get_object(self, pk):
        return get_object_or_404(Account, pk=pk, is_active=True)

    def get(self, request, pk):
        account = self.get_object(pk)
        serializer = AccountSerializer(account)
        return Response(serializer.data)

    def put(self, request, pk):
        account = self.get_object(pk)
        serializer = AccountSerializer(account, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        account = self.get_object(pk)
        account.soft_delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class CategoryListCreateAPIView(APIView):
    def get(self, request):
        categories = Category.objects.filter(is_active=True)
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CategoryDetailAPIView(APIView):
    def get_object(self, pk):
        return get_object_or_404(Category, pk=pk, is_active=True)

    def get(self, request, pk):
        category = self.get_object(pk)
        serializer = CategorySerializer(category)
        return Response(serializer.data)

    def put(self, request, pk):
        category = self.get_object(pk)
        serializer = CategorySerializer(category, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        category = self.get_object(pk)
        category.soft_delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class TransactionListCreateAPIView(APIView):
    def get(self, request):
        from_date = request.query_params.get("from")
        to_date = request.query_params.get("to")
        transactions = Transaction.objects.filter(is_active=True)
        if from_date:
            try:
                from_date_obj = parse_date(from_date)
                if from_date_obj:
                    transactions = transactions.filter(date__gte=from_date_obj)
            except Exception:
                return Response({"error": "Invalid from date format. Use YYYY-MM-DD."}, status=status.HTTP_400_BAD_REQUEST)
        if to_date:
            try:
                to_date_obj = parse_date(to_date)
                if to_date_obj:
                    transactions = transactions.filter(date__lte=to_date_obj)
            except Exception:
                return Response({"error": "Invalid to date format. Use YYYY-MM-DD."}, status=status.HTTP_400_BAD_REQUEST)
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            transaction = serializer.save()
            apply_transaction_effect(transaction)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TransactionDetailAPIView(APIView):
    def get_object(self, pk):
        return get_object_or_404(Transaction, pk=pk, is_active=True)

    def get(self, request, pk):
        transaction = self.get_object(pk)
        serializer = TransactionROSerializer(transaction)
        return Response(serializer.data)

    def put(self, request, pk):
        transaction = self.get_object(pk)
        # Reverse the old transaction effect
        apply_transaction_effect(transaction, reverse=True)
        serializer = TransactionSerializer(transaction, data=request.data, partial=True)
        if serializer.is_valid():
            updated_transaction = serializer.save()
            # Apply the new transaction effect
            apply_transaction_effect(updated_transaction)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        transaction = self.get_object(pk)
        # Reverse the transaction effect
        apply_transaction_effect(transaction, reverse=True)
        transaction.soft_delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Feature 2: Account info based on interval
class AccountInfoIntervalAPIView(APIView):
    """
    Returns account info and summary for a given interval.
    Query params:
        from: YYYY-MM-DD
        to: YYYY-MM-DD
    """
    def get(self, request, pk):
        account = get_object_or_404(Account, pk=pk, is_active=True)
        from_date = request.query_params.get("from")
        to_date = request.query_params.get("to")
        transactions = account.transactions.filter(is_active=True)
        if from_date:
            from_date_obj = parse_date(from_date)
            if from_date_obj:
                transactions = transactions.filter(date__gte=from_date_obj)
        if to_date:
            to_date_obj = parse_date(to_date)
            if to_date_obj:
                transactions = transactions.filter(date__lte=to_date_obj)
        serializer = AccountSerializer(account)
        tx_serializer = TransactionROSerializer(transactions, many=True)
        # Calculate summary
        income = sum([tx.amount for tx in transactions if tx.transaction_type == "INCOME"])
        expense = sum([tx.amount for tx in transactions if tx.transaction_type == "EXPENSE"])
        transfer_in = sum([tx.amount for tx in transactions if tx.transaction_type == "TRANSFER" and tx.to_account_id == account.id])
        transfer_out = sum([tx.amount for tx in transactions if tx.transaction_type == "TRANSFER" and tx.account_id == account.id])
        return Response({
            "account": serializer.data,
            "transactions": tx_serializer.data,
            "summary": {
                "income": income,
                "expense": expense,
                "transfer_in": transfer_in,
                "transfer_out": transfer_out,
            }
        })
