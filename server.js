const fastify = require('fastify')({logger: true});

const { users, products } = require('./data/data');



 //GEt user profile PRIVATE
 const getUserProducts =  async (request, reply) => {
    try {

      //get user by id from param;
      const user_id = request.params.id;

      //Find user 
      const user = users.find( item => item.id === user_id ).products;
      
      const userLastProduct = user[user.length-1];
      //console.log(userLastProduct)
      
    
        //find last Product purchased Category
      const productLastViewed = products.find( data => data.id == userLastProduct.product_id ).category

      // return all products with the same category
      const suggestedProduct = products.filter(item => item.category == productLastViewed )

      //const productsToSuggest = 

      
      if (!user) {
        reply.status(404).send({ error: 'User was not found' });
        return;
      }
  
      reply.send(suggestedProduct);

    
      
    } catch (err) {
      console.error('Error getting user products:', err);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  };
  

  fastify.get('/api/v1/recommendations/:id',  getUserProducts)  




fastify.listen({ port: 8000 }, (err) => {if (err) throw err });