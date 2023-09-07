import React from 'react'
import { useSelector } from "react-redux";

const Orderdetailmodal = props => {
    const langg = useSelector((state) => state.cart.language);

    return (
        <>
            {props.showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        dir={langg == "En" ? "ltr" : "rtl"}
                    >
                        <div className="relative my-6 mx-auto w-full md:w-3/4">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        {langg == "En" ? "Invoice Detail" : langg == "Ar" ? "تفاصيل الفاتورة" : "وردەکاری فاکتورە"}
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => props.setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <div className="w-full flex justify-center">
                                        <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
                                            <table className="w-full text-sm text-left text-gray-500">
                                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3">
                                                            {langg == "En" ? "Item Name" : langg == "Ar" ? "اسم العنصر" : "ناوی بابەت"}
                                                        </th>
                                                        <th scope="col" className="px-6 py-3">
                                                            {langg == "En" ? "Item Price" : langg == "Ar" ? "سعر السلعة" : "نرخی بابەت"}
                                                        </th>
                                                        <th scope="col" className="px-6 py-3">
                                                            {langg == "En" ? "Order Quantity" : langg == "Ar" ? "كمية الطلب" : "کۆی داواکراو"}
                                                        </th>
                                                        <th scope="col" className="px-6 py-3">
                                                            {langg == "En" ? "State" : langg == "Ar" ? "حالة" : "دۆخ"}
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {props.invoice_detail.map((invoice, index) => (
                                                        <tr className="bg-white border-b cursor-pointer" key={index}>
                                                            <td className="px-6 py-4">{langg == "En" ? invoice.item_name : langg == "Ar" ? invoice.item_name_ar : invoice.item_name_ku}</td>
                                                            <td className="px-6 py-4">{invoice.item_price}</td>
                                                            <td className="px-6 py-4">{invoice.item_qty}</td>
                                                            <td className="px-6 py-4">{invoice.item_state}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => props.setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    )
}

export default Orderdetailmodal