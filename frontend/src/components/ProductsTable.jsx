import React from 'react'
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";


const ProductsTable = ({filteredProducts, handleDelete}) => {
  return (
    <table className='w-full border-separate border-spacing-0'>
    <thead>
      <tr>
        <th className='border border-slate-600 rounded-md'>No.</th>
        <th className='border border-slate-600 rounded-md'>Product</th>
        <th className='border border-slate-600 rounded-md max-md:hidden'>
          Quantity
        </th>
        <th className='border border-slate-600 rounded-md max-md:hidden'>
          Price
        </th>
        <th className='border border-slate-600 rounded-md'>Operations</th>
      </tr>
    </thead>
    <tbody>
      {filteredProducts.map((product, index) => (
        <tr key={product._id} className='h-8'>
          <td className='border border-slate-700 rounded-md text-center'>
            {index + 1}
          </td>
          <td className='border border-slate-700 rounded-md text-center'>
            {product.title}
          </td>
          <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
            {product.quantity}
          </td>
          <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
            {product.price}
          </td>
          <td className='border border-slate-700 rounded-md text-center'>
            <div className='flex justify-center md:gap-x-12 gap-x-2'>
              <Link to={`/products/details/${product._id}`}>

                {/* <FaEye className='text-2xl text-green-800' /> */}
                <button className='flex justify-center items-center gap-1 py-1 px-2 text-xs text-white rounded-md bg-green-700 hover:scale-110 hover:bg-green-900' title="Click to View Product">
                <FaEye className='text-xs text-black' />View</button>

              </Link>
              <Link to={`/products/edit/${product._id}`}>
                
                <button className='flex justify-center items-center  gap-1 py-1 px-2 text-xs text-white rounded-md bg-fuchsia-600 hover:scale-110 hover:bg-fuchsia-900' title="Click to Edit Product">
                <AiOutlineEdit className='text-xs text-black' />Edit</button>
              </Link>
              <button
                onClick={() => handleDelete(product._id)}
                className='bg-red-800 hover:scale-110 hover:bg-red-600 rounded-md p-1' title="Delete Product??"
              >
                <MdOutlineDelete className='text-lg text-white' />
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  )
}

export default ProductsTable;