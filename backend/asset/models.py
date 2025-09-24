from django.db import models
from django.core.exceptions import ValidationError
import uuid

class AssetBase(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        unique=True,
        db_index=True,
        help_text="Primary key: Universally unique identifier for this object."
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        editable=False,
        db_index=True,
        help_text="Timestamp when this object was created."
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        editable=False,
        db_index=True,
        help_text="Timestamp when this object was last updated."
    )
    is_active = models.BooleanField(
        default=True,
        db_index=True,
        help_text="Designates whether this object is active."
    )

    class Meta:
        abstract = True
        ordering = ['-created_at']
        get_latest_by = 'created_at'
        verbose_name = "Asset Base"
        verbose_name_plural = "Asset Bases"

    def __str__(self):
        return f"<{self.__class__.__name__}-{self.id}>"

    def soft_delete(self):
        """Soft delete the object by marking it inactive."""
        self.is_active = False
        self.save(update_fields=['is_active', 'updated_at'])


class Account(AssetBase):
    ACCOUNT_TYPE_CHOICES = [
        ("BANK", "Bank"),
        ("CASH", "Cash"),
        ("CREDIT", "Credit Card"),
        ("INVESTMENT", "Investment"),
        ("LOAN", "Loan"),
        ("OTHER", "Other"),
    ]

    name = models.CharField(
        max_length=255,
        db_index=True,
        help_text="Account name (e.g., 'Checking', 'Savings', 'Visa Card')."
    )
    account_type = models.CharField(
        max_length=20,
        choices=ACCOUNT_TYPE_CHOICES,
        default="BANK",
        db_index=True,
        help_text="Type of account."
    )
    balance = models.DecimalField(
        max_digits=18,
        decimal_places=2,
        default=0.00,
        help_text="Current account balance."
    )
    real_balance = models.DecimalField(
        max_digits=18,
        decimal_places=2,
        default=0.00,
        help_text="Current actual balance."
    )
    currency = models.CharField(
        max_length=10,
        default="CAD",
        help_text="Currency code (e.g., USD, CAD)."
    )
    description = models.TextField(
        blank=True,
        null=True,
        help_text="Optional description or notes about the account."
    )

    class Meta:
        verbose_name = "Account"
        verbose_name_plural = "Accounts"
        ordering = ["name"]

    def __str__(self):
        return f"{self.name} ({self.get_account_type_display()})"


class Category(AssetBase):
    CATEGORY_TYPE_CHOICES = [
        ("INCOME", "Income"),
        ("EXPENSE", "Expense"),
    ]

    name = models.CharField(
        max_length=100,
        unique=True,
        db_index=True,
        help_text="Name of the category (e.g., Food, Salary, Utilities)."
    )
    category_type = models.CharField(
        max_length=10,
        choices=CATEGORY_TYPE_CHOICES,
        db_index=True,
        help_text="Type of category: Income or Expense."
    )
    description = models.TextField(
        blank=True,
        null=True,
        help_text="Optional description for the category."
    )

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"
        ordering = ["name"]

    def __str__(self):
        return f"{self.name} ({self.get_category_type_display()})"

class Transaction(AssetBase):
    TRANSACTION_TYPE_CHOICES = [
        ("INCOME", "Income"),
        ("EXPENSE", "Expense"),
        ("TRANSFER", "Transfer"),
    ]

    account = models.ForeignKey(
        Account,
        on_delete=models.CASCADE,
        related_name="transactions",
        help_text="Account associated with this transaction."
    )
    transaction_type = models.CharField(
        max_length=10,
        choices=TRANSACTION_TYPE_CHOICES,
        db_index=True,
        help_text="Type of transaction."
    )
    amount = models.DecimalField(
        max_digits=18,
        decimal_places=2,
        help_text="Transaction amount."
    )
    currency = models.CharField(
        max_length=10,
        default="CAD",
        help_text="Currency code (e.g., USD, CAD)."
    )
    note = models.TextField(
        blank=True,
        null=True,
        help_text="Optional note or notes about the transaction."
    )
    description = models.TextField(
        blank=True,
        null=True,
        help_text="Optional description or notes about the transaction."
    )
    date = models.DateField(
        db_index=True,
        help_text="Date of the transaction."
    )
    to_account = models.ForeignKey(
        Account,
        on_delete=models.CASCADE,
        related_name="incoming_transfers",
        blank=True,
        null=True,
        help_text="Destination account for transfer transactions."
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="transactions_category",
        help_text="Category of the transaction. Only required for Income or Expense."
    )

    class Meta:
        verbose_name = "Transaction"
        verbose_name_plural = "Transactions"
        ordering = ["-date", "-created_at"]

    def __str__(self):
        return f"{self.get_transaction_type_display()} - {self.amount} {self.currency} ({self.date})"

    def clean(self):
        super().clean()
        if self.transaction_type == "TRANSFER":
            if not self.to_account:
                raise ValidationError({"to_account": "This field is required for transfer transactions."})
            if self.to_account == self.account:
                raise ValidationError({"to_account": "Source and destination accounts must be different."})
