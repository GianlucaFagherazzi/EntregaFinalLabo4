export const isAdmin = (req,res,next)=>{
  if(req.user.role !== "ADMIN"){
    return res.status(403).json({msg:"Solo permitido para administradores"});
  }
  next();
}