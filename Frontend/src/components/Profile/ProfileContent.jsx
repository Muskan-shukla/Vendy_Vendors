import React, { useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../server";
import styles from "../../styles/styles";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from '@mui/material';
import { Link } from "react-router-dom";
import { MdOutlineTrackChanges, MdTrackChanges } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
// import {
//   deleteUserAddress,
//   loadUser,
//   updatUserAddress,
//   updateUserInformation,
// } from "../../redux/actions/user";
// import { Country, State } from "country-state-city";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
// import { getAllOrdersOfUser } from "../../redux/actions/order";
import { backend_url } from "../../server";


const ProfileContent = ({ active }) => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const handleSubmit=(e)=>{
    e.preventDefault();
  }
  return (
    <div className='w-full'>
      {/* profile page */}

      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${backend_url}${user?.avatar}`}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                alt="User Avatar"
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <AiOutlineCamera />
              </div>
            </div>
          </div>
          <br />
          <br />

          <div className="w-full px-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full 800px:flex block pb-3">
                <div className="w-[50%]">
                  <label className='block pb-2'>Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="w-[50%]">
                  <label className='block pb-2'>Email Address</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3">
                <div className="w-[50%]">
                  <label className='block pb-2'>Phone number</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="w-[50%]">
                  <label className='block pb-2'>Zip code</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3">
                <div className="w-[50%]">
                  <label className='block pb-2'>Address 1</label>
                  <input
                    type="address"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                </div>
                <div className="w-[50%]">
                  <label className='block pb-2'>Address 2 </label>
                  <input
                    type="address"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                </div>
              </div>
              <input
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                required
                value="Update"
                type="submit"
              />
            </form>
          </div>
        </>
      )}

      {/* order page */}

      {
        active ===2 &&(
          <div>
            <AllOrders/>
          </div>
        )
      }

      {/* Refund Page  */}

      {
        active ===3 &&(
          <div>
            <AllRefundOrders/>
          </div>
        )
      }

      {/* track order  */}
      {
        active ===5 &&(
          <div>
            <TrackOrder/>
          </div>
        )
      }

      {/* payment method */}
      {
        active ===6 &&(
          <div>
            <PaymentMethod/>
          </div>
        )
      }
    </div>
  );
};

const AllOrders=()=>{
  const orders=[
    {
      _id:"7463hvbfbhfbrtr28829221",
    orderItems:[
      {
        name:"Iphone 14 pro max",
      },
    ],
    totalPrice:120,
    orderStatus:"Processing",
  },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor";

      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className='pl-8 pt-1'>
      <DataGrid
      rows={row}
      columns={columns}
      pageSize={10}
      disableSelectionOnClick
      autoHeight
      />

    </div>
  )
}

const AllRefundOrders=()=>{
  const orders=[
    {
      _id:"7463hvbfbhfbrtr28829221",
    orderItems:[
      {
        name:"Iphone 14 pro max",
      },
    ],
    totalPrice:120,
    orderStatus:"Processing",
  },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor";

      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });


  return (
    <div className='pl-8 pt-1'>
    <DataGrid
    rows={row}
    columns={columns}
    pageSize={10}
    disableSelectionOnClick
    autoHeight
    />

  </div>
    
    
  )
}

const TrackOrder=()=>{
  const orders=[
    {
      _id:"7463hvbfbhfbrtr28829221",
    orderItems:[
      {
        name:"Iphone 14 pro max",
      },
    ],
    totalPrice:120,
    orderStatus:"Processing",
  },
  ];
const columns=[
  { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

  {
    field: "status",
    headerName: "Status",
    minWidth: 130,
    flex: 0.7,
    cellClassName: (params) => {
      return params.row.status === "Delivered" ? "greenColor" : "redColor";

    },
  },
  {
    field: "itemsQty",
    headerName: "Items Qty",
    type: "number",
    minWidth: 130,
    flex: 0.7,
  },

  {
    field: "total",
    headerName: "Total",
    type: "number",
    minWidth: 130,
    flex: 0.8,
  },

  {
    field: " ",
    flex: 1,
    minWidth: 150,
    headerName: "",
    type: "number",
    sortable: false,
    renderCell: (params) => {
      return (
        <>
          <Link to={`/order/${params.id}`}>
            <Button>
              <MdOutlineTrackChanges size={20} />
            </Button>
          </Link>
        </>
      );
    },
  },
];


const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });
return (
  <div className='pl-8 pt-1'>
    <DataGrid
    rows={row}
    columns={columns}
    pageSize={10}
    disableSelectionOnClick
    autoHeight
    
    />

  </div>

)
}

const PaymentMethod=()=>{
  return(
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2"
        >
          Payment Methods
        </h1>
        <div className={`$${styles.button} !rounded-md`}>
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAfCAMAAACF8f6iAAAAdVBMVEX///8UNMsAJMkAKspca9YALMoAJskAD8cIL8oAIMgAHcioreYAFMextumiqOUAAMaMlN9GV9G+wuxLXNLv8Pp7hdxlctf6+/7Cxu3f4fbm6PiVnOLO0fHV1/PZ3PSco+RWZtU5TdCBit0tRM5vetkfOswnP839FUl8AAAB00lEQVQ4je1TW4KDIAwkIIKIj/q2rda27t7/iJsE63KE/dj5aIlJJiQThPjHn8KjbbcEkQfzjkY7ihZ/ZzS7R+uMf/YLO+chSbbikzlOQ6W1ria2EqnlIGajtSFWk1oAsL5kp1RayySqelUAqqZT5wH8IgoJ9iLEDS0rM6n8Ss4iQxJQ8X1rBbbli6dgn0L0ioi6CkBfiql4GY56UnXw1yjx7vADHdCRYRNvC1nDFexv0Oopjxy/GH1gmpAgPc2HxLD7GbQrJJVHTx+0XEJsGtI6XEAjDZXwfRdCsH27jebo6RQlhfTGTfmOLT3g10tKwzCPTwhyf2GFOHFxSCduR8KgQbIAiad5uI3OOHk30n39HGc6mrNlLQT9u9Db9E0SONyOxoHqBQklizgxwSI5qvcmWbG3ajwcJVJSWxcLab6uNJ0+TsQkOLQQTRYIAlBTlHamQaXOYVjkQ8xBJElnXAdibXhdSHa1U/qJ8zYMzevEGuGtqI/WfO2vXWHDZiFlrSHIs/8DO1F61swATw5DtCI+/xJlWF4RplPGiYWR0vHmL5WUuJzXKsPHoJWj6lkmTXh4c3WEfdCVeV6yQiueaEZdU+/JXtNzu5Lz2CA85uIffws/lusXjWNFJpAAAAAASUVORK5CYII=" alt="" />
        <h5 className="pl-5 font-[600]">
          Muskan Shukla
        </h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6>1234 **** *** ****</h6>
          <h5 className="pl-6">
            08/2024
          </h5>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8">

          <AiOutlineDelete size={25} className="cursor-pointer"/>

        </div>
      </div>
    </div>
  )
}
export default ProfileContent;
