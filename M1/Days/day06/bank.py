class BankConfig:

    _instance = None

    def __new__(cls):

        if cls._instance is None:

            cls._instance = super().__new__(cls)

            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = 1000

        return cls._instance


config = BankConfig()


class SMSAlert:

    def update(self, message):
        print("SMS Alert:", message)


class AuditLog:

    def update(self, message):
        print("Audit Log:", message)


class Account:

    def __init__(self, owner, number, balance=0):

        self.owner = owner
        self.account_number = number
        self._balance = balance
        self.observers = []

    @property
    def balance(self):
        return self._balance

    def subscribe(self, observer):
        self.observers.append(observer)

    def _notify(self, message):

        for observer in self.observers:
            observer.update(message)

    def deposit(self, amount):

        if amount <= 0:
            raise ValueError("Amount must be positive")

        self._balance += amount

        self._notify(f"{self.owner} deposited {amount} ETB")

    def withdraw(self, amount):

        if amount > self._balance:
            raise ValueError("Insufficient balance")

        self._balance -= amount

        self._notify(f"{self.owner} withdrew {amount} ETB")

    def statement(self):
        print(f"Account: {self.owner}")
        print("Balance:", self.balance)


class SavingsAccount(Account):

    def __init__(self, owner, number, balance=0):

        super().__init__(owner, number, balance)

        self.rate = config.interest_rate

    def add_interest(self):
        self.deposit(self.balance * self.rate)

    def statement(self):
        print("Savings Account")
        super().statement()


class CurrentAccount(Account):

    def __init__(self, owner, number, balance=0):

        super().__init__(owner, number, balance)

        self.overdraft = config.overdraft_limit

    def withdraw(self, amount):

        if amount > self.balance + self.overdraft:
            raise ValueError("Overdraft limit exceeded")

        self._balance -= amount

        self._notify(f"{self.owner} withdrew {amount} ETB")

    def statement(self):
        print("Current Account")
        super().statement()


class AccountFactory:

    @staticmethod
    def create(kind, owner, number, balance=0):

        if kind == "savings":
            return SavingsAccount(owner, number, balance)

        elif kind == "current":
            return CurrentAccount(owner, number, balance)

        else:
            raise ValueError("Unknown account type")


acc1 = AccountFactory.create(
    "savings",
    "Almaz",
    "S001",
    2000
)

acc2 = AccountFactory.create(
    "current",
    "Dawit",
    "C001",
    1000
)

sms = SMSAlert()
audit = AuditLog()

acc1.subscribe(sms)
acc1.subscribe(audit)

acc2.subscribe(sms)
acc2.subscribe(audit)

acc1.add_interest()

acc2.withdraw(1500)

accounts = [acc1, acc2]

for account in accounts:
    account.statement()
    print("-" * 30)

config1 = BankConfig()
config2 = BankConfig()

print(config1 is config2)