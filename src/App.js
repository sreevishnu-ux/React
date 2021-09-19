import React from "react";
import "./App.css";
// import CartItem from './CartItem';
import Cart from "./Cart";
import Navbar from "./Navbar";
import * as firebase from "firebase";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      prodcuts: [],
      loading: true
    };
    this.db = firebase.firestore();
  }

 

  componentDidMount() {
    this.db.collection("prodcuts")
    .orderBy('price',)
    .onSnapshot(snapshot => {
      const prodcuts = snapshot.docs.map(doc => {
        const data = doc.data();
        data["id"] = doc.id;
        return data;
      });
      this.setState({ prodcuts: prodcuts, loading: false });
    });
  }

  handleIncreaseQuantity = product => {
    const { prodcuts } = this.state;
    const index = prodcuts.indexOf(product);

    // prodcuts[index].qty += 1;

    // this.setState({
    //   prodcuts
    // });

    const docRef = this.db.collection("prodcuts").doc(prodcuts[index].id);

    docRef
      .update({ qty: prodcuts[index].qty + 1 })
      .then(() => {
        console.log("Document updated sucessfully");
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleDecreaseQuantity = product => {
    const { prodcuts } = this.state;
    const index = prodcuts.indexOf(product);

    if (prodcuts[index].qty === 0) {
      return;
    }
    // prodcuts[index].qty -= 1;

    // this.setState({
    //   prodcuts
    // });
    const docRef = this.db.collection("prodcuts").doc(prodcuts[index].id);

    docRef
      .update({ qty: prodcuts[index].qty - 1 })
      .then(() => {
        console.log("Document updated sucessfully");
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleDeleteProduct = id => {
    const { prodcuts } = this.state;

    const docRef = this.db.collection("prodcuts").doc(id);

    docRef
      .delete()
      .then(() => {
        console.log("Deleted sucessfully");
      })
      .catch(err => {
        console.log(err);
      });

    // const items = prodcuts.filter(product => product.id !== id);

    // this.setState({
    //   prodcuts: items
    // });
  };

  getcountOfCartItems = () => {
    const { prodcuts } = this.state;
    let count = 0;

    prodcuts.forEach(product => {
      count += product.qty;
    });

    return count;
  };

  getcartTotal = () => {
    const { prodcuts } = this.state;
    let cartTotal = 0;

    prodcuts.map(product => {
      if (product.qty > 0) {
        cartTotal = cartTotal + product.qty * product.price;
      }
      return "";
    });

    return cartTotal;
  };

  addProduct = () => {
    this.db
      .collection("prodcuts")
      .add({
        img: "",
        price: 900,
        qty: 3,
        title: "Washing Machine"
      })
      .then(docRef => {
        docRef.get().then(snapshot => {
          console.log("Product has been added", snapshot.data());
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { prodcuts, loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getcountOfCartItems()} />
        {/* <button onClick={this.addProduct} style={{ padding: 20, fontSize: 20 }}>
          Add a Product
        </button> */}
        <Cart
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
          prodcuts={prodcuts}
        />
        {loading && <h1>Loading Prodcuts...</h1>}
        <div style={{ padding: 20, fontSize: 20, color: 'blue' }}>
          TOTAL : {this.getcartTotal()}
        </div>
      </div>
    );
  }
}

export default App;
