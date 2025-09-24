from django.contrib import admin

from .models import Account, Category, Transaction
from .service import apply_transaction_effect


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ("id", "transaction_type", "amount", "account", "to_account", "date", "is_active")
    list_filter = ("transaction_type", "is_active", "date")
    search_fields = ("description",)

    def save_model(self, request, obj, form, change):
        if change:
            # Reverse old effect before saving new
            old_obj = Transaction.objects.get(pk=obj.pk)
            apply_transaction_effect(old_obj, reverse=True)
        super().save_model(request, obj, form, change)
        apply_transaction_effect(obj)

    def delete_model(self, request, obj):
        apply_transaction_effect(obj, reverse=True)
        obj.soft_delete()


admin.site.register(Account)
admin.site.register(Category)
