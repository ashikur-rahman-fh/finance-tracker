from rest_framework import serializers
from .models import Account, Category, Transaction

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at', 'is_active')

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at', 'is_active')

class TransactionSerializer(serializers.ModelSerializer):
    class AccountOrNameField(serializers.PrimaryKeyRelatedField):
        def to_internal_value(self, data):
            try:
                return super().to_internal_value(data)
            except Exception:
                pass

            if isinstance(data, str):
                qs = self.get_queryset()
                matches = qs.filter(name=data)
                count = matches.count()
                if count == 1:
                    return matches.first()
                elif count > 1:
                    raise serializers.ValidationError(
                        f"Multiple accounts found with name '{data}'. Please provide the account UUID."
                    )
                else:
                    raise serializers.ValidationError(f"Account with id or name '{data}' does not exist.")

            raise serializers.ValidationError("Invalid value for account field")

    account = AccountOrNameField(queryset=Account.objects.filter(is_active=True))
    to_account = AccountOrNameField(
        queryset=Account.objects.filter(is_active=True),
        allow_null=True,
        required=False,
    )
    class CategoryOrNameField(serializers.PrimaryKeyRelatedField):
        def to_internal_value(self, data):
            # Try primary-key based resolution first (UUID string)
            try:
                return super().to_internal_value(data)
            except Exception:
                pass

            # Fallback: if a string provided, try to lookup by name
            if isinstance(data, str):
                qs = self.get_queryset()
                matches = qs.filter(name=data)
                count = matches.count()
                if count == 1:
                    return matches.first()
                elif count > 1:
                    raise serializers.ValidationError(
                        f"Multiple categories found with name '{data}'. Please provide the category id."
                    )
                else:
                    raise serializers.ValidationError(f"Category with id or name '{data}' does not exist.")

            raise serializers.ValidationError("Invalid value for category field")

    category = CategoryOrNameField(
        queryset=Category.objects.filter(is_active=True),
        allow_null=True,
        required=False,
    )

    class Meta:
        model = Transaction
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at', 'is_active')
        depth = 2

    def validate(self, data):
        transaction_type = data.get('transaction_type')
        to_account = data.get('to_account')
        account = data.get('account')

        # Ensure account is provided
        if not account:
            raise serializers.ValidationError({"account": "This field is required."})

        if transaction_type == "TRANSFER":
            if not to_account:
                raise serializers.ValidationError({"to_account": "This field is required for transfer transactions."})
            if to_account == account:
                raise serializers.ValidationError({"to_account": "Source and destination accounts must be different."})
        return data


class TransactionROSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id', 'transaction_type', 'amount', 'currency', 'date', 'account', 'to_account', 'note', 'description', 'category']
        read_only_fields = ['transaction_type', 'amount', 'currency', 'date', 'account', 'to_account']
        depth = 2
