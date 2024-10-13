import { createContext, useContext } from "react";

interface SidebarContext {
    collapsed: boolean;
    setCollapsed: () => void;
 }


 export const SidebarContext = createContext<SidebarContext>({
    collapsed:false,
    setCollapsed:() =>{},
 })


 export const useSidebarContext = ()=>{
   const context = useContext(SidebarContext);
      if (!context) throw new Error("useSidebarContext must be used within a SidebarProvider");
      return context;
 }


 
 
