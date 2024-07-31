import { useContext } from "react"
import { useParams } from "react-router-dom"
import { ShopContext } from "../context/ShopContext"
import ProductDescription from "../components/ProductDescription"
import ProductHD from "../components/ProductHD"
import ProductMD from "../components/ProductMD"

const Product = () => {
  const {all_products} = useContext(ShopContext)
  const {productId} = useParams()
  const  product = all_products.find((e) => e._id === productId)
  if (!product) {
    return <div className="h1 pt-28 ">Product Not Found</div>
  }

  return (
    <section className="max-padd-container py-20">
      <div>
        <ProductHD product={product}/>
        <ProductMD product={product}/>
        <ProductDescription product={product}/>
      </div>
    </section>
  )
}

export default Product