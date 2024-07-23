import { Link } from "react-router-dom"
import {RiDribbbleFill, RiGithubFill, RiInstagramFill, RiLinkedinFill, RiTwitterFill, RiTwitterXFill, RiYoutubeFill} from "react-icons/ri"

const SocialIcons = () => {
  return (
    <div className="flex gap-6 pr-4">
        <Link to={''} className="text-[#ff0000] text-2xl hover:-translate-y-1 transition-all duration-500"><RiYoutubeFill/></Link>
        <Link to={''} className="text-[#f08a5d] text-2xl hover:-translate-y-1 transition-all duration-500"><RiInstagramFill/></Link>
        <Link to={''} className="text-[#000] text-2xl hover:-translate-y-1 transition-all duration-500"><RiTwitterXFill/></Link>
        <Link to={''} className="text-[#0e76a8] text-2xl hover:-translate-y-1 transition-all duration-500"><RiLinkedinFill/></Link>
        <Link to={''} className="text-[#ea4c89] text-2xl hover:-translate-y-1 transition-all duration-500"><RiDribbbleFill/></Link>
        <Link to={'https://www.github.com/diegovilhalva'} className="text-[#000] text-2xl hover:-translate-y-1 transition-all duration-500" target="_blank"><RiGithubFill/></Link>
    </div>
  )
}

export default SocialIcons