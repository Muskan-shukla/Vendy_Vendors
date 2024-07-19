import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/styles';
import { AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineMessage } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const ProductDetails = ({ data }) => {
    const [count, setCount] = useState(1);
    const [click, setClick] = useState(false);
    const [select, setSelect] = useState(0);
    const navigate = useNavigate();

    const incrementCount = () => {
        setCount(count + 1);
    };
    const decrementCount = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    }
    const handleMessageSubmit = () => {
        navigate("/inbox?conversation=507ebjver884ehfdjeriv84");
    }

    return (
        <div className="bg-white">
            {data ? (
                <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
                    <div className="w-full py-5">
                        <div className="block w-full 800px:flex">
                            <div className="w-full 800px:w-[50%]">
                                <img src={data.image_Url[select].url} alt=""
                                    className="w-[80%]" />
                                <div className="w-full flex">
                                    <div className={`${select === 0 ? "border" : "null"}cursor-pointer`}>
                                        <img src={data?.image_Url[0].url} alt=""
                                            className='h-[200px]'
                                            onClick={() => setSelect(0)} />
                                    </div>
                                    <div className={`${select === 1 ? "border" : "null"}cursor-pointer`}>
                                        <img src={data?.image_Url[1].url} alt=""
                                            className='h-[200px]'
                                            onClick={() => setSelect(1)} />


                                    </div>
                                </div>
                            </div>
                            <div className="w-full 800px:w-[50%] pt-5">
                                <h1 className={`${styles.productTitle}`}>
                                    {data.name}
                                </h1>
                                <p>{data.description}</p>
                                <div className="flex pt-3">
                                    <h4 className={`${styles.productDiscountPrice}`}>
                                        {data.discount_price}$
                                    </h4>

                                    <h3 className={`${styles.price}`}>
                                        {data.price ? data.price + "$" : null}
                                    </h3>
                                </div>
                                <div className="flex items-center mt-12 justify-between pr-3">
                                    <div>
                                        <button
                                            className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                                            onClick={decrementCount}
                                        >
                                            -
                                        </button>
                                        <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                                            {count}
                                        </span>
                                        <button
                                            className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                                            onClick={incrementCount}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div>
                                        {click ? (
                                            <AiFillHeart
                                                size={30}
                                                className="cursor-pointer"
                                                // onClick={() => removeFromWishlistHandler(data)}
                                                onClick={() => setClick(!click)}
                                                color={click ? "red" : "#333"}
                                                title="Remove from wishlist"
                                            />
                                        ) : (
                                            <AiOutlineHeart
                                                size={30}
                                                className="cursor-pointer"
                                                // onClick={() => addToWishlistHandler(data)}
                                                onClick={() => setClick(!click)}
                                                title="Add to wishlist"
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}>
                                    <span className="text-white flex items-center">
                                        Add to cart <AiOutlineShoppingCart className="ml-1" />
                                    </span>
                                </div>
                                <div className="flex items-center pt-8">
                                    <img
                                        src={data.shop.shop_avatar.url}
                                        alt=""
                                        className="w-[50px] h-[50px] rounded-full mr-2"
                                    />
                                    <div className="pr-8">
                                        <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                                            {data.shop.name}
                                        </h3>
                                        <h5 className="pb-3 text-[15px]">
                                            ({data.shop.ratings}) Ratings
                                        </h5>
                                    </div>
                                    <div className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11`}
                                        onClick={handleMessageSubmit}>
                                        <span className="text-white flex items-center">
                                            Send Message <AiOutlineMessage className="ml-1" />
                                        </span>

                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                    <ProductDetailsInfo data={data} />
                    <br />
                    <br />
                </div>
            ) : null
            }
        </div>
    )
}

const ProductDetailsInfo = ({ data }) => {
    const [active, setActive] = useState(1);

    return (
        <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
            <div className="w-full flex justify-between border-b pt-10 pb-2">
                <div className="relative">
                    <h5
                        className={
                            "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
                        }
                        onClick={() => setActive(1)}
                    >
                        Product Details
                    </h5>
                    {active === 1 ? (
                        <div className={`${styles.active_indicator}`} />
                    ) : null}
                </div>

                <div className="relative">
                    <h5
                        className={
                            "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
                        }
                        onClick={() => setActive(2)}
                    >
                        Product Review
                    </h5>
                    {active === 2 ? (
                        <div className={`${styles.active_indicator}`} />
                    ) : null}
                </div>

                <div className="relative">
                    <h5
                        className={
                            "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
                        }
                        onClick={() => setActive(3)}
                    >
                        Seller Information
                    </h5>
                    {active === 3 ? (
                        <div className={`${styles.active_indicator}`} />
                    ) : null}
                </div>

            </div>
            {active === 1 ? (
                <>
                    <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante.
                        Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,
                    </p>
                    <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore,
                        cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere
                    </p>
                    <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore,
                        cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere
                    </p>
                </>
            ) : null
            }

            {active === 2 ? (
                <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
                    <p>No Reviews yet</p>
                </div>

            ) : null}
            {active === 3 ? (
                <div className="w-full block 800px:flex p-5">
                    <div className="w-full 800px:w-[50%]">
                        <div className="flex items-center">
                            <img src={data.shop.shop_avatar.url}
                                className="w-[50px] h-[50px] rounded-full" alt="" />
                            <div className="pl-3">
                                <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                                <h5 className="pb-2 text-[15px]">
                                    ({data.shop.ratings}) Ratings
                                </h5>
                            </div>

                        </div>
                        <p className='pt-2'>
                            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia.
                            It is a paradisematic
                        </p>

                    </div>
                    <div className="w-full 800px:w-[50%] pl-10">
                        <div className="text-left">
                            <h5 className="font-[600]">
                                Joined on:
                                <span className="font-[500]">
                                    14 March,2024
                                </span>
                            </h5>
                            <h5 className="font-[600]">
                               Total Products 
                                <span className="font-[500]">
                                    1,223
                                </span>
                            </h5>
                            <h5 className="font-[600]">
                                Total Reviews
                                <span className="font-[500]">
                                    324
                                </span>
                            </h5>
                            <Link to="/">
                            <div  className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}>
                            <h4 className="text-white">Visit Shop</h4>

                            </div>
                            </Link>
                        </div>
                    </div>

                </div>

            ) : null}
        </div>
    )
}
export default ProductDetails