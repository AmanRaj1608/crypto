pragma solidity ^0.8.0;

contract LowReturnRisk {
    struct Lender {
        address owner;
        address borrower;
        uint amount;
        bool statusOfLending;
    }
    struct Borrower {
        address owner;
        address lender;
        uint amount;
        bool statusOfBorrowing;
    }
    
    Lender lender;
    Borrower borrower;
    
    function lendIntoPools(address _lender, uint amount) public returns (bool) {
        if(_lender.balance < (10 ** 18 ) * (amount)) {
            return false;
        }
        else {
            lender.owner = _lender;
            lender.amount = amount;
            lender.statusOfLending = true;
            return true;
        }
    }
    
    function borrowFromPools(address _borrower, uint amount) public returns(bool) {
        if(10 * _borrower.balance < (10 ** 18 ) * (10 * amount +  amount)) {
            return false;
        }
        else {
            borrower.owner = _borrower;
            borrower.lender = lender.owner;
            borrower.amount = amount;
            borrower.statusOfBorrowing = true;
            lender.borrower = borrower.owner;
            return true;
        }
    }
    
    
    function paybackTheLendingAmount(address _borrower) public returns(bool) {
        if(borrower.owner == _borrower) {
            if(borrower.statusOfBorrowing == true) {
                if(10 * _borrower.balance < (10 ** 18 ) * (10 * borrower.amount + borrower.amount)) {
                    return false;
                }
                else {
                    return true;
                }
            }
            else 
                return false;
        }
        else {
            return false;
        }
    }
    
    function afterDone() public returns(bool) {
        delete lender;
        delete borrower;
        return true;
    }
    
}