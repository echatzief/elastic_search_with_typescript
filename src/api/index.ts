import express from 'express';
import { SearchResponse } from 'elasticsearch';
import { Product } from '../models/product';
import { elasticClient } from '../elasticsearch';

const router = express.Router();

router.post('/products',async( req: express.Request, res: express.Response )=>{
  try{

    // Retrieve the info from the request
    const p: Product ={
      title: req.body.title || '',
      description: req.body.description || '',
      price: req.body.price || 0,
      productId: req.body.productId || -1,
    }
    
    // Save the entry to elastic database
    await elasticClient.index({ index: 'products', body: p , type: "object"})

    return res.send({ message: "Product is successfully created"});
  } catch(e){
    throw new Error(e);
  }
})

router.get('/products',async( req: express.Request, res: express.Response )=>{
  try{
    let searchResult : SearchResponse<unknown> 
    if(req.query && req.query.title){
      searchResult = await elasticClient.search({ 
        index: 'products',
        body: {
          query: { wildcard: { title: `*${req.query.title}*`} }
        }
      });
      return res.send({ ...searchResult.hits.hits });
    }
    searchResult = await elasticClient.search({ index: 'products'});
    return res.send({ ...searchResult.hits.hits });
  } catch(e){
    throw new Error(e);
  }
})

export default router;