import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/AuthContext";
import { useLoader } from "../../context/LoaderContext";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts?.default?.vfs || pdfFonts?.vfs;

const MyFeesPage = () => {
  const { user, userData } = useAuth();
  const [fees, setFees] = useState([]);
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    const fetchFees = async () => {
      if (!user?.uid) return;
      const docRef = doc(db, "studentFees", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFees(docSnap.data().assignedFees || []);
      }
    };
    fetchFees();
  }, [user]);

  const downloadReceipt = (fee, user) => {
    const receiptContent = (copyFor) => [
      { text: "Payment Receipt", style: "header", alignment: "center" },
      {
        text: `Copy for: ${copyFor}`,
        style: "subheader",
        margin: [0, 10, 0, 10],
      },
      {
        style: "table",
        table: {
          widths: ["*", "*"],
          body: [
            ["Student ID", user.uid],
            ["Name", user.name],
            ["Email", user.email],
            ["Fee Name", fee.feeName],
            ["Amount", `${fee.amount} BDT`],
            ["Status", fee.status],
            ["Date", new Date().toLocaleString()],
          ],
        },
        layout: "lightHorizontalLines",
      },
      {
        columns: [
          {
            text: "\n\nStudent Signature:\n\n________________________",
            alignment: "left",
            margin: [0, 30, 0, 0],
          },
          {
            text: "\n\nCashier Signature:\n\n________________________",
            alignment: "right",
            margin: [0, 30, 0, 0],
          },
        ],
      },
      {
        text: "------------------------------------------",
        alignment: "center",
        margin: [0, 30, 0, 10],
      },
    ];

    const docDefinition = {
      content: [...receiptContent("Student"), ...receiptContent("College")],
      styles: {
        header: { fontSize: 18, bold: true },
        subheader: { fontSize: 14, bold: true },
        table: { margin: [0, 5, 0, 15] },
      },
    };

    pdfMake.createPdf(docDefinition).download(`receipt-${fee.feeName}.pdf`);
  };

  const handlePayNow = async (fee) => {
    showLoader();
    try {
      const res = await fetch("http://localhost:5001/payment-init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: fee.amount,
          studentId: user.uid,
          feeId: fee.feeId,
          feeName: fee.feeName,
          name: user.name,
          email: user.email,
          phone: "01914090085",
        }),
      });

      const data = await res.json();
      console.log(data);
      const docRef = doc(db, "studentFees", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFees(docSnap.data().assignedFees || []);
      }
    } catch (error) {
      console.error(error);
      alert("Payment erro: ", error);
    } finally {
      hideLoader();
    }
  };
  return (
    <Layout role={["student"]}>
      <div className="container mt-4">
        <h3>My Fees</h3>
        {fees.length === 0 ? (
          <p>No fees assigned yet.</p>
        ) : (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Fee Name</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fees.map((fee, idx) => (
                <tr key={idx}>
                  <td>{fee.feeName}</td>
                  <td>{fee.amount} BDT</td>
                  <td className="text-center">
                    <span
                      className={`badge ${
                        fee.status === "paid"
                          ? "bg-success"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {fee.status.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    {fee.status === "unpaid" ? (
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handlePayNow(fee)}
                      >
                        Pay Now
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => downloadReceipt(fee, userData)}
                      >
                        Download Reciept
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default MyFeesPage;
