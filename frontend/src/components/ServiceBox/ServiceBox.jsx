// packages
import { Link } from "react-router-dom";
import { Skeleton, Stack } from "@mui/material";
//styles
import "./ServiceBox.css";

export default function ServiceBox(props) {
  const { icon, title, link,status}=props
  return (
   <>
    {status==="loading"?
    <div className="linkBox__link">
    <Stack spacing={1} style={{paddingTop:"1rem"}}>
    <Skeleton animation="wave" variant="circular" width="5rem" height="5rem" />
    <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem'}} />
    <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem'}} />

    </Stack>
    </div>
    : <Link className="linkBox__link" to={link}>
      <div className="linkBox__iconBox">{icon}</div>
      <h4 className="linkBox__title">{title}</h4>
      <span className="ss02">+10 محصول</span>
    </Link>}
   </>
  );
}
