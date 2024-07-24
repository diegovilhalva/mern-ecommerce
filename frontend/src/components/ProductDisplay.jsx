import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"
import Item from "./Item"


const ProductDisplay = ({ category }) => {
    const { all_products } = useContext(ShopContext)

    return (
        <div className="max-padd-container pt-8 pb-16xl:pb-28">
            <h2 className="bold-32">Our Great Products</h2>
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mt-12">
                    {all_products.map((product,i) => {
                        if (category === "All" ||  category === product.category) {
                            return (
                                <div key={i}>
                                    <Item key={product.id} product={product} />
                                </div>
                            )
                        }
                    })}
            </div>
        </div>
    )
}

export default ProductDisplay