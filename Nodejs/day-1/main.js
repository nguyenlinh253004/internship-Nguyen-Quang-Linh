import { add, multiply } from "./Math.js";
function demo(){
    if(true){
        var a = 10;
        let b = 13;
        const c = 15;
        
      console.log("trong blok");
      console.log("a:",a);
      console.log("b:",b);
      console.log("c:",c);
     // phần này lỗi vì const không thể gán lại giá trị
    //    c= 20;
    // try {
    //       console.log("b:",b);
    // } catch (error) {
    //         console.log("error")
    // }

    }
    console.log("ngoài blok a:",a)
    try {
        console.log("ngoài blok b:",b)
    } catch (error) {
        console.log("error")
    }
    try {
        console.log("ngoài blok c:",c)
    } catch (error) {
        console.log("error")
    }

    //arrow function
    const greet = (name) => {
        return "Hello " + name;
    }
    console.log(greet("Hà"));
    
    const square = (n) => {
        return n * n;
    }
    console.log(square(5));
    // arow function chứa mảng 
    const squareArray = (arr) => {
        return arr.map((n) => n * n);
    }
    console.log("mảng ban đầu là:1, 2, 3, 4, 5");
    console.log("mảng bình phương là",squareArray([1, 2, 3, 4, 5]));
    // spread operator
    const oldArray = [1, 2, 3];
    const newArray = [...oldArray, 4, 5, 6];
    console.log("mảng cũ là",oldArray); 
    console.log("spread mảng mới là",newArray);
    // rest operator
    const sumAll = (...numbers) => {
        return numbers.reduce((acc, curr) => acc + curr, 0);
    }
    console.log("rest tổng là",sumAll(1, 2, 3, 4, 5));
     // destructuring
    const user = { name: 'An', age: 20, city: 'HCM' };
    const { name, age, city } = user;
    console.log("destructuring là");
    console.log("tên là",name); 
    console.log("tuổi là",age);
    console.log("thành phố là",city);
    // destructuring mảng
    const colors = ['red', 'green', 'blue'];
    const [firstColor,...rest] = colors;
    console.log("mảng màu là",colors);
    console.log("màu đầu tiên là",firstColor);
    console.log("màu còn lại là",rest);
    // destructuring mảng với giá trị mặc định
    const numbers = [1, 2];
    const [a1 = 0, b1 = 0, c1 = 0] = numbers;
    console.log("mảng số là",numbers);

    // import { add, multiply } from './Math.js';
    console.log("hàm add",add(1, 2)); // 3
    console.log("hàm multiply",multiply(2, 3)); // 6
     // Array Functions (map, filter, reduce, ...)
    const numbersArray =  [1, 2, 3, 4, 5, 6];
    const doubled = numbersArray.map(num => num * 2);
    console.log("mảng số là",numbersArray);
    console.log("mảng số nhân đôi là",doubled); // [2, 4, 6, 8]
    const evenNumbers = numbersArray.filter(num => num % 2 === 0);
    console.log("mảng số là",numbersArray);
    console.log("mảng số chẵn là",evenNumbers); // [2, 4, 6]
    const sumOfNumbers = numbersArray.reduce((acc, num) => acc + num, 0);
    console.log("mảng số là",numbersArray);
    console.log("tổng mảng số là",sumOfNumbers); // 21
    //chứng minh number là kiểu primitive, còn object là kiểu tham chiếu.
    let x = 10;
    let y = x; // Primitive type (number)
    y = 20; // Changing y does not affect x
    console.log("x:",x); // 10
    console.log("y:",y); // 20
    const obj1 = { name: 'An' };
    const obj2 = obj1; // Reference type (object)
    obj2.name = 'B'; // Changing obj2 affects obj1
    console.log("obj1:",obj1); // { name: 'B' }
    console.log("obj2:",obj2); // { name: 'B' }
    // Quản lý danh sách sản phẩm
    // Khai báo danh sách sản phẩm ban đầu:
    const products = [
        { id: 1, name: 'iPhone', price: 100 },
        { id: 2, name: 'iPad', price: 200 },
        { id: 3, name: 'Macbook', price: 300 },
    ];
     console.log("danh sách sản phẩm ban đầu là",products);
    // Thêm sản phẩm mới vào danh sách:
    const newProduct = { id: 4, name: 'Apple Watch', price: 400 };
    products.push(newProduct);
    console.log("danh sách sản phẩm sau khi thêm là",products);
    // xóa sản phẩm theo id
    const productIdToDelete = 2;
    const indexToDelete = products.findIndex(product => product.id === productIdToDelete);
    if (indexToDelete !== -1) {
        products.splice(indexToDelete, 1);
    }
    console.log("danh sách sản phẩm sau khi xóa là",products);
    // tính tổng giá
     const totalPrice = products.reduce((total, product) => total + product.price, 0);
    console.log("tổng giá sản phẩm là",totalPrice); // 800
    // lấy danh sách tên sản phẩm
    const productNames = products.map(product => product.name);
    console.log("danh sách tên sản phẩm là",productNames); // ['iPhone', 'Macbook', 'Apple Watch']
    // tìm sản phẩm theo tên
    const productNameToFind = 'iPhone';
    const foundProduct = products.filter(product => product.name === productNameToFind);  
    if (foundProduct) {
        console.log("sản phẩm tìm thấy là",foundProduct); // { id: 1, name: 'iPhone', price: 100 }
    } else {
        console.log("không tìm thấy sản phẩm");
    }
    // lọc sản phẩm có giá cao hơn
    const minPrice = 150;
    const filteredProducts = products.filter(product => product.price > minPrice);  
    console.log("danh sách sản phẩm có giá lớn hơn",minPrice,"là",filteredProducts); // [{ id: 3, name: 'Macbook', price: 300 }, { id: 4, name: 'Apple Watch', price: 400 }]
}
demo();