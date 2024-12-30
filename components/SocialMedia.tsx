import {
    Github,
    Linkedin,
  } from "@/components/icons";
  import Link from "next/link";
  
  export default function SocialMedia() {
    return (
  
      
      // Social Icons
      <nav className="flex gap-3 ">
  
        <Link href={"https://www.linkedin.com/in/maryam-shahid-b2765529a/"} target="_blank">
          <Linkedin className={`w-6 h-6`} />
        </Link> 
        <Link href={"https://github.com/mar-yam12"} target="_blank">
          <Github className={`w-6 h-6 fill-dark dark:fill-light`} />
        </Link>
      </nav>
    );
  }
  