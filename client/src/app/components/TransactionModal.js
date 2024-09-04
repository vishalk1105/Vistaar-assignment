import React from "react";
import { formatDate } from "../../constants";

const TransactionModal = ({ transactionData, accNum, modalId }) => {
  return (
    <div
      className="modal fade"
      id={modalId}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header justify-content-center">
            <h1 className="modal-title text-center fs-5" id="exampleModalLabel">
              Account Number: {accNum}
            </h1>
          </div>
          <div className="modal-body">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Date</th>
                  <th scope="col">Description</th>
                  <th scope="col">Type</th>
                </tr>
              </thead>
              <tbody>
                {transactionData.length !== 0 ? (
                  transactionData.map((tr, index) => {
                    return (
                      <tr key={tr._id}>
                        <th scope="row">{index + 1}</th>
                        <td>{tr.amount}</td>
                        <td>{formatDate(tr.date)}</td>
                        <td>{tr.description}</td>
                        <td>{tr.type}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td className="text-center" colSpan={5}>
                      No transactions to Show
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
