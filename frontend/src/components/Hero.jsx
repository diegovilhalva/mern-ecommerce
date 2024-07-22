import {Link} from "react-router-dom"
import {FaArrowRight} from "react-icons/fa6"
const Hero = () => {
  return (
    <section className="max-padd-container bg-hero  bg-cover bg-center bg-no-repeat h-[744px] w-full" id="home">
                    Fashion Essencials
        <div className="">
            <div className="relative top-24 xs:top-72">
                <h4 className="uppercase medium-18 tracking-wider">
                </h4>
                <h2 className="h1 capitalize max-w-[40rem]">Upgrade Your Fashion <span className="text-secondary">with Every Click. </span>
                 Shop Today!
                </h2>
                <p className="my-5 max-w-[33rem]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem accusamus molestias aliquid obcaecati, numquam alias?</p>
                <div className="flex items-center gap-x-4">
                    <Link className="inline-flex items-center justify-center gap-4 p-3 bg-white rounded-xl">
                        <div className="regular-14 leading-tight pl-4">
                            <h5 className="uppercase font-bold">New Arrivals</h5>
                            <p className="regular-14 mt-1">10% Off</p>
                        </div>
                        <div className="bg-primary h-10 w-10 p-1 rounded-full flexCenter">
                            <FaArrowRight/>
                        </div>
                    </Link>
                    <Link className="inline-flex items-center justify-center gap-4 p-3 bg-tertiary  rounded-xl text-white">
                        <div className="regular-14 leading-tight pl-4">
                            <h5 className="uppercase font-bold">Hot Deals</h5>
                            <p  className="regular-14 mt-1">50% Off</p>
                        </div>
                        <div className="bg-primary h-10 w-10 p-1 rounded-full flexCenter text-tertiary">
                            <FaArrowRight/>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Hero