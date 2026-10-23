"use client";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, FileText, GraduationCap, BookOpen } from "lucide-react";

type ResourceGroup = { title:string; description:string; links:string[][] };
export function ResourceCard({group,index,reducedMotion,isAr,officialPage}:{group:ResourceGroup;index:number;reducedMotion:boolean;isAr:boolean;officialPage:string}) {
 return <motion.article className="resource-panel" initial={reducedMotion?false:{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:0.15}} transition={{duration:0.45,delay:index*0.08}}>
  <div className="resource-top"><span className="resource-number">0{index+1}</span>{index===0?<GraduationCap size={24}/>:index===1?<BookOpen size={24}/>:<FileText size={24}/>}</div>
  <h3>{group.title}</h3><p className="resource-description">{group.description}</p>
  <div className="resource-links">{group.links.map(([label,url])=><a key={label} href={url} {...(url.startsWith("http")?{target:"_blank",rel:"noreferrer"}:{})}><span>{label}</span><ExternalLink size={15}/></a>)}</div>
  <a className="resource-main-link" href={isAr?"https://iaet.edu.eg/ar/comm":"https://www.iaet.edu.eg/comm"} target="_blank" rel="noreferrer">{officialPage}{isAr?<ArrowLeft size={16}/>:<ArrowRight size={16}/>}</a>
 </motion.article>;
}
