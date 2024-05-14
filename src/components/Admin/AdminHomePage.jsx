import React from 'react'
import AdminNavBar from './AdminNavBar'
import HeaderBottomAdmin from './HeaderBottomAdmin'
import MainBoxAdmin from './MainBoxAdmin'
import  OutofStockProduct from './crudOperations/OutofStockProduct'
import TopSoldProducts from './crudOperations/TopSoldProducts'
import MangeOrders from './crudOperations/MangeOrders'
const AdminHomePage = () => {
  return (
    <>
   
     <MainBoxAdmin/>
     <TopSoldProducts/>
     <OutofStockProduct/>
   
     
     
    </>
  )
}

export default AdminHomePage
