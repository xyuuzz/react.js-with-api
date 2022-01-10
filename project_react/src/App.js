import { Row } from './components/partials/Row';
import { Container } from './components/partials/Container';
import { ListCategories, Navbar, ListProducts, Result } from './components/index.js';
import { useState } from 'react';

function App() 
{
  // state kategori makanan yang akan di passing di component LC dan LP
  const [pickCategory, setPickCategory] = useState("Makanan");
  
  // state keranjang / cart yang akan di passing di component LP dan Result
  const [keranjang, setKeranjang] = useState([]);
  
  return (
    <div>
      {/* component navbar */}
      <Navbar/>
      {/* component container */}
      <Container width="70">
        {/* component row / pembungkus */}
        <Row areas="categories products result">
          {/* component LC dengan mengirimkan props state kategori yang nanti akan di sync dengan produk yang ditampilkan di component LP */}
          <ListCategories setPickCategory={setPickCategory} />
          {/* component LP dengan mengirimkan state kategori dan keranjang untuk berkolaborasi dengan component LC dan Result */}
          <ListProducts pickCategory={pickCategory} setKeranjang={setKeranjang} />
          {/* component result dengan mengirimkan state keranjang yang akan berkolaborasi dengan component LP */}
          <Result keranjang={keranjang} setKeranjang={setKeranjang} />
        </Row>
      </Container>
    </div>
  );
}

export default App;
