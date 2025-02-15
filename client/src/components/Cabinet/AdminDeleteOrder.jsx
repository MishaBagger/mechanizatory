import { useEffect, useState } from 'react'
import AdminService from '../../services/AdminService'



export default function AdminDeleteOrder({ setDeleteSuccess, catchErrors }) {
    const [orderValue, setOrderValue] = useState()
    const [getOrders, setGetOrders] = useState()


    useEffect(() => {
        getOrderData()
    }, [])

    async function getOrderData() {
        try {
            const orders = await AdminService.getAllOrders()
            setGetOrders(orders.data)
        } catch (e) {
            catchErrors(e)
        }
    }

        function deleteOrder(e) {
            e.preventDefault()
            requestDeleteOrder()
            e.target.reset()
        }
    
        async function requestDeleteOrder() {
            try {
                const deleteResponse = await AdminService.deleteOrder(
                    orderValue
                )
                setDeleteSuccess(deleteResponse.data)

                getOrderData()
                setTimeout(() => {
                    setDeleteSuccess('')
                }, 5000)
            } catch (e) {
                catchErrors(e)
            }
        }
    return (
        <form
            className="formOrder formOrder-admin formOrder-delete"
            onSubmit={deleteOrder}
            method="post"
        >
            <h2 className="title title-form">Удалить заказ</h2>
            <select
                className="formInput"
                name="selectService"
                defaultValue={'DEFAULT'}
                onChange={(e) => setOrderValue(e.target.value)}
            >
                <option value="DEFAULT" disabled>
                    Выберите
                </option>
                {getOrders &&
                    getOrders.map((order) => (
                        <option key={order.id} value={order.id}>
                            #{order.id}
                            {': '}
                            {order.description}
                        </option>
                    ))}
            </select>
            <button className="formButton">Удалить</button>
        </form>
    )
}
