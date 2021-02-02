import './App.css';
import Card from './Components/Card';


function App() {
  const card1={
    title: 'Spring',
    text: 'During springtime, the daylight hours become longer, the sun shines a little stronger, and flowers begin to bloom! Also, the temperatures start to drop, and it might be windy and rainy sometimes.',
    imgUrl: 'https://wp-cdn.lingokids.com/wp-content/uploads/2020/11/20172F112F172F112F062F022F2948f6dc-73f1-4ad0-8336-516e900e2f1e2FSpring.png',
    imgAlt: 'photo of spring'
  };

  const card2={
    title: 'Summer',
    text: 'Summertime’s the hottest season of the year! The days are longer and the sun shines brightly in a clear sky. During this time of the year, the trees are full of leaves. It’s clearly the best time to go to the beach since the weather is warm and the days are sunny!',
    imgUrl: 'https://wp-cdn.lingokids.com/wp-content/uploads/2020/11/20172F112F172F112F072F072Fe7428f62-c95f-468b-ad7d-fb86fe3524cf2FSummer.png',
    imgAlt: 'photo of summer'
  };

  const card3={
    title: 'Autumn',
    text: 'When fall comes, the days become shorter, leaves start to fall from the trees, and piles of leaves rest on the ground. Also, the temperatures start dropping and it gets a little bit colder every day.',
    imgUrl: 'https://wp-cdn.lingokids.com/wp-content/uploads/2020/11/20172F112F172F112F072F502F1c5d5405-4aee-42d1-af84-a3e7933ca3882FAutumn.png',
    imgAlt: 'photo of autumn'
  };

  
  const card4={
    title: 'Winter',
    text: 'It’s the coldest time of the year! The days are short and nights are long. In some places usually snows, and in others, it’s the rainfall season. Wintertime is also known as the cold season, the perfect time to practice snowboarding and to go skiing.',
    imgUrl: 'https://wp-cdn.lingokids.com/wp-content/uploads/2020/11/20172F112F172F112F082F262Ff2e5be59-203e-4e60-bd1d-e628669ef1512FWinter.png',
    imgAlt: 'photo of winter'
  };

  return (
    <div className="App">
      <div className="card_wrapper">
        <Card title={card1.title} text={card1.text} img={card1.imgUrl} imgAlt={card1.imgalt} />
        <Card title={card2.title} text={card2.text} img={card2.imgUrl} imgAlt={card2.imgalt} />
        <Card title={card3.title} text={card3.text} img={card3.imgUrl} imgAlt={card3.imgalt} />
        <Card title={card4.title} text={card4.text} img={card4.imgUrl} imgAlt={card4.imgalt} />
      </div>
    </div>
  )
}



export default App;
