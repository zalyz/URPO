// import React, { Component } from 'react';
//
// export class Home extends Component {
//   static displayName = Home.name;
//
//   render () {
//     return (
//       <div>
//         <h1>Test test</h1>
//         <p>Welcome to your new single-page application, built with:</p>
//         <ul>
//           <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
//           <li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
//           <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
//         </ul>
//         <p>To help you get started, we have also set up:</p>
//         <ul>
//           <li><strong>Client-side navigation</strong>. For example, click <em>Counter</em> then <em>Back</em> to return here.</li>
//           <li><strong>Development server integration</strong>. In development mode, the development server from <code>create-react-app</code> runs in the background automatically, so your client-side resources are dynamically built on demand and the page refreshes when you modify any file.</li>
//           <li><strong>Efficient production builds</strong>. In production mode, development-time features are disabled, and your <code>dotnet publish</code> configuration produces minified, efficiently bundled JavaScript files.</li>
//         </ul>
//         <p>The <code>ClientApp</code> subdirectory is a standard React application based on the <code>create-react-app</code> template. If you open a command prompt in that directory, you can run <code>npm</code> commands such as <code>npm test</code> or <code>npm install</code>.</p>
//       </div>
//     );
//   }
// }

import React, {useContext, useState} from 'react';
import './Ticket/Home.styles.css'
import Ticket from "./Ticket/Ticket";
import {useHistory} from "react-router-dom";
import {MyContext} from "../App";

const Home = () => {
  const {tickets, setTickets} = useContext(MyContext)
  const [filterNumber, setFilterNumber] = useState('')
  const [filterTime, setFilterTime] = useState('')
  const history = useHistory()

  const clickCreateNewTicketButtonHandler = () => {
    history.push('/new-ticket')
  }


  const submitFilterHandler = async (event) => {
    event.preventDefault()
    console.log('test')
    const req = await fetch(`https://localhost:44320/api/ticket/filter?flightNumber=${filterNumber}&departureDateTime=12.12.2022-09:30`)
    const data = await req.json()

    setTickets(data)
  }

  return (
    <div className={'home-wrapper'}>
     <div>
       <h1>Tickets</h1>
     </div>
      <form className={'filter-form'} onSubmit={submitFilterHandler}>
        <input value={filterNumber} onChange={(event) => setFilterNumber(event.target.value)} placeholder={'Flight number'} />
        <input value={filterTime} onChange={(event) => setFilterTime(event.target.value)} type={'date'} />
        <button>Filter</button>
      </form>
      <button className={'home__create-ticket'} onClick={clickCreateNewTicketButtonHandler}>Create new ticket</button>
      <div className={'home__wrapper'}>
        {tickets.map((ticket) => (
          <Ticket key={ticket.Id}
              Id={ticket.Id}
              FlightNumber={ticket.FlightNumber}
              ClientId={ticket.ClientId}
              DepartureDate={ticket.DepartureDate}
              Price={ticket.Price}
              tickets={tickets}
              setTickets={setTickets}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;