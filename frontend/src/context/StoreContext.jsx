
import { createContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null)

const StoreConstextProvider = (props)=>{

    const [cartItems,setCartItems] = useState({});
    const url = "http://localhost:4000"
    const [token,setToken] = useState("")
    const [food_list,setFoodList] = useState([]);
    const [promotionList, setPromotionList] = useState([]);

    const fetchFoodList = async () => {
        const response = await axios.get(url+"/api/food/list")
        setFoodList(response.data.data)
    }

    const fetchPromotionList = async () => {
        const response = await axios.get(url + "/api/promotion/listpromotion");
        setPromotionList(response.data.data);
        console.log(response);
    };

    const promotion = () => {
        let discount = 0;
        for (const cartAddedItem in cartItems){
            if(cartItems[cartAddedItem] > 0){
                let cartItemInfo = food_list.find((product) => product._id === cartAddedItem);
                let promotionItem = promotionList.find((promoItem) => promoItem.itemName === cartItemInfo.name);
                let cartQuantity = cartItems[cartAddedItem];
                console.log("cartItemInfo: ", cartItemInfo);
                console.log("PromotionItem: ", promotionItem);
                console.log("cartQuantity: ", cartQuantity);
            
                if (promotionItem && promotionItem.discount && cartQuantity >= promotionItem.quantity) {
                    discount += promotionItem.discount;
                    discount = (promotionItem.discount*(cartItemInfo.price*cartQuantity)/100);
                }
            }
        }
        return discount;
    }

    const getTotalCartAmount = () =>{
        let totalAmount = 0;
        for (const item in cartItems){
            
            if(cartItems[item] > 0){
                let iteminfo = food_list.find((product) => product._id === item);
                totalAmount += iteminfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const addToCart = async (itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev) =>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }

    const removeFromCart = async (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }


    const loadCartData = async (token) => {
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData);
    }

    useEffect(() =>{
        async function loadData(){
            await fetchFoodList();
            await fetchPromotionList();
            if(localStorage.getItem("token")){
               setToken(localStorage.getItem("token"));
               await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        removeFromCart,
        addToCart,
        getTotalCartAmount,
        promotion,
        url,
        token,
        setToken
    }

    return(

        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default  StoreConstextProvider
