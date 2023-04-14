import  React  from "react";
import { Box, Typography } from "@material-ui/core";

const Footer = ()=>{
    return (
<Box mt={8}>
          <Typography variant="body2" color="textSecondary" align="center">
            {'© '}
            {new Date().getFullYear()}
            {' My App. All rights reserved.'}
          </Typography>
</Box>
)
}
    


export default Footer;