pragma solidity ^0.8.0;
import "./HighReturnRisk.sol";
import "./MediumReturnRisk.sol";
import "./LowReturnRisk.sol";

contract Loans {
    
    uint creditScore;
    
    HighReturnRisk hrr;
    MediumReturnRisk mrr;
    LowReturnRisk lrr;
    
    constructor(uint _credit) public {
        creditScore = _credit;
    }
    
    function lendIntoPools(uint poolNumber, address lender, uint amount) public returns (bool) {
        if(poolNumber == 1) {
            bool status = hrr.lendIntoPools(lender, amount);
            return status;
        }
        else if(poolNumber == 2) {
            bool status = mrr.lendIntoPools(lender, amount);
            return status;
        }
        else {
            bool status = lrr.lendIntoPools(lender, amount);
            return status;
        }
    }
    
    function borrowFromPools(address borrower, uint amount) public returns(bool) {
        if(creditScore < 350) {
            bool status = hrr.borrowFromPools(borrower, amount);
            return status;
        }
        else if(creditScore >= 350 && creditScore < 700) {
            bool status = mrr.borrowFromPools(borrower, amount);
            return status;
        }
        else {
            bool status = lrr.borrowFromPools(borrower, amount);
            return status;
        }
    }
    
    
    function paybackTheLendingAmount(address borrower, uint poolNumber) public returns(bool) {
        if(poolNumber == 1) {
            bool status = hrr.paybackTheLendingAmount(borrower);
            return status;
        }
        else if(poolNumber == 2) {
            bool status = mrr.paybackTheLendingAmount(borrower);
            return status;
        }
        else {
            bool status = lrr.paybackTheLendingAmount(borrower);
            return status;
        }
    }
}