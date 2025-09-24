from django.urls import path
from .views import (
    AccountListCreateAPIView, AccountDetailAPIView,
    CategoryListCreateAPIView, CategoryDetailAPIView,
    TransactionListCreateAPIView, TransactionDetailAPIView,
    AccountInfoIntervalAPIView,
)

urlpatterns = [
    path('accounts/', AccountListCreateAPIView.as_view(), name='account-list-create'),
    path('accounts/<uuid:pk>/', AccountDetailAPIView.as_view(), name='account-detail'),
    path('accounts/<uuid:pk>/interval/', AccountInfoIntervalAPIView.as_view(), name='account-interval-info'),
    path('categories/', CategoryListCreateAPIView.as_view(), name='category-list-create'),
    path('categories/<uuid:pk>/', CategoryDetailAPIView.as_view(), name='category-detail'),
    path('transactions/', TransactionListCreateAPIView.as_view(), name='transaction-list-create'),
    path('transactions/<uuid:pk>/', TransactionDetailAPIView.as_view(), name='transaction-detail'),
]
