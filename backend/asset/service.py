from .models import Transaction, Account

def apply_transaction_effect(transaction: Transaction, reverse=False):
    """
    Apply or reverse the effect of a transaction on account balances.
    If reverse=True, the effect is undone (used for update/delete).
    """
    multiplier = -1 if reverse else 1

    if transaction.transaction_type == "INCOME":
        transaction.account.balance += multiplier * transaction.amount
        transaction.account.save(update_fields=["balance"])
    elif transaction.transaction_type == "EXPENSE":
        transaction.account.balance -= multiplier * transaction.amount
        transaction.account.save(update_fields=["balance"])
    elif transaction.transaction_type == "TRANSFER":
        # Subtract from source, add to destination
        transaction.account.balance -= multiplier * transaction.amount
        transaction.account.save(update_fields=["balance"])
        if transaction.to_account:
            transaction.to_account.balance += multiplier * transaction.amount
            transaction.to_account.save(update_fields=["balance"])
