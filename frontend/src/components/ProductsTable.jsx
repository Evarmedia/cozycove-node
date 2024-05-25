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
                <FaEye className='text-2xl text-green-800' />
              </Link>
              <Link to={`/products/edit/${product._id}`}>
                <AiOutlineEdit className='text-2xl text-orange-800' />
              </Link>
              <button
                onClick={() => handleDelete(product._id)}
                className='text-2xl text-red-800'
              >
                <MdOutlineDelete />
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