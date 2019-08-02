import React from 'react';
import withLayout from '../lib/withLayout';
import { Grid } from '@material-ui/core';
import girlboat from '../static/img/pictures/meuf_dans_son_bateau.png';

import nissan from '../static/img/brand/nissan.png';
import sanofi from '../static/img/brand/sanofi.png';
import chipotle from '../static/img/brand/chipotle.png';
import travelocity from '../static/img/brand/travelocity.png';

const trustedBrands = [ 
    nissan, sanofi, chipotle, travelocity,
    nissan, sanofi, chipotle, travelocity,
    nissan, sanofi, chipotle, travelocity
]

const chunk = (array, size) => {
    const chunked_arr = [];
    let index = 0;
    while (index < array.length) {
      chunked_arr.push(array.slice(index, size + index));
      index += size;
    }
    return chunked_arr;
  }

const PartnerGrid = (props) => {
    console.log("length rowBrand", props.rowBrand)
    
    return (
        <Grid id={"partner"} container item xs={12}>
            {
                props.rowBrand.map((brand, idx) => {
                    return (
                        <Grid item container xs={3} justify={'center'} style={{padding: "1em"}} key={idx}>
                            <img src={brand} alt="demo" className="logo"/>
                        </Grid>
                    );
                })
            }
        </Grid>
    );
}

const AnnonceDemo = () => {

    let brandChuncked = chunk(trustedBrands, 4)

    return (
        <Grid container>
            <Grid id={"description"} container>
                <Grid container item xs={6} alignItems="center" alignContent="center" style={{height: "400px"}}>
                    <h2 className="text-center"> En incarnant votre marque, les influenceurs la rendent plus vivante et sensible</h2>
                    <p className="text-center">
                        Grâce à leur communauté, vous obtenez un moyen privilégié d'échange avec vos clients et futurs clients.
                    </p>
                </Grid>
                <Grid container item xs={6} className="dots-pink" alignItems="center">
                    <img src={girlboat} alt="demo"/>
                </Grid>
            </Grid>
            <Grid id={"form-demo"} container alignContent="center">
                <Grid item xs={12}>
                    <h2 className="text-center">
                        Intéressé par une démo ? Contactez-nous
                    </h2>
                    <div className="text-center">
                        <span>Vous êtes un influenceur ? </span><span style={{color: "red"}}>Inscrivez-vous par ici</span>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <h2 className="text-center">Il nous font confiance</h2>
                </Grid>
                {
                    brandChuncked.map((rowBrand, idx) => {
                        return <PartnerGrid key={idx} rowBrand={rowBrand}/>
                    })
                }
            </Grid>
        </Grid>
    );
}

export default withLayout(AnnonceDemo)