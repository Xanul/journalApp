import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
  cloud_name:'xanul',
  api_key: '655268644895687',
  api_secret: 'C5S5e0kJGp2C2OmGNeAGUPdgChI',
  secure: true
});

describe('Pruebas en fileUpload', () => {

  test('Debe de subir el archivo correctamente a Cloudinary', async () => {

    const imageURL = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFuZHNjYXBlJTIwYmFja2dyb3VuZHxlbnwwfHwwfHw%3D&w=1000&q=80';
    const resp = await fetch( imageURL );
    const blob = await resp.blob();
    const file = new File([blob], 'foto.jpg');

    const url = await fileUpload( file );
    expect( typeof url ).toBe('string');

    // console.log(url);
    const segments = url.split('/');
    const imageId = segments[segments.length - 1].replace('.jpg', '');
    
    await cloudinary.api.delete_resources(['journal/' + imageId], {
      resource_type: 'image'
    });

  })

  test('Debe de retornar null', async () => {

    const file = new File([], 'foto.jpg');
    const url = await fileUpload( file );
    expect( url ).toBe(null);

  })

})