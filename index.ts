#! /usr/bin/env node
import inquirer from "inquirer";
interface BankAccount{
    accountNumber: number;
    balance: number;
    withdraw(amount: number):void;
    deposit(amount: number):void;
    checkBalance():void;
    

}
class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;
    constructor(accountNumber: number, balance: number){
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    // Debit Money

    withdraw(amount: number): void {
        if(this.balance >= amount){
            this.balance -= amount
            console.log(`Withdrawal of $${amount} successful. Remaining Balance: ${this.balance}`);
            
        }
        else{
            console.log("Insufficient Balance ");
            
        }
    }

    // Credit Money
    deposit(amount: number): void {
        if(amount > 100){
            amount -= 1;

        }this.balance += amount
        console.log(`deposit of $${amount} successful. Remaining Balance: ${this.balance}`);
        
    }
    //Check Balance
    checkBalance(): void {
        console.log(`Current balance: $${this.balance}`);
        
    }
};
// customer class
class Customer{
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount;

    constructor(firstName: string, lastName: string, gender: string, age: number, mobileNumber: number, account: BankAccount){
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;


    }
}
// Create Bank Accounts
const accounts: BankAccount[]= [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000),
    
];

// Create customers
const customers: Customer[] = [
    new Customer("Amna", "Aftab Kifayat", "Female", 28, 123456, accounts[0]),
    new Customer("Farah", "Naz", "Female", 29, 789456, accounts[1]),
    new Customer("Kifayat", "Ullah", "Male", 40, 456789, accounts[2]),
]

// Function to interact with bank account
async function service(){
    do{
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Please enter your Account Number"

        });
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
        if(customer){
            console.log(`Welcome , ${customer.firstName} ${customer.lastName}!`);
            const ans = await inquirer.prompt([{
                name: "select",
                type: "list",
                message: "Select an Operation",
                choices: ["Deposit", "Withdraw", "Check Balance", "Exit"],
            }]);
            switch(ans.select){
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the deposit amount:"
                    })
                    customer.account.deposit(depositAmount.amount);
                    break;
                    case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the withdrawal amount:"
                    })
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                    case "Check Balance":
                        customer.account.checkBalance();
                        break;
                    case "Exit":
                        console.log(`Exiting from bank operations.......`);
                        console.log("Thank you for using our bank services!");
                        return;
                        
                        


            }
            
        }else{
            console.log("Invalid Account Number. Please try again!");
            
        }

            
        
    }while(true);
}
service();