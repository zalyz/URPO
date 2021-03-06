
// export default class App extends Component {
//   static displayName = App.name;
//
//   render () {
//     return (
//       <Layout>
//         <Route exact path='/' component={Home} />
//         <Route exact path='/new-ticket' component={CreateTicket} />
//       </Layout>
//     );
//   }
// }

import React, {useEffect, useState} from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import './custom.css'
import CreateTicket from "./components/CreateTicket/CreateTicket";
import UpdateTicket from "./components/UpdateTicket/UpdateTicket";
import Users from "./components/Users/Users";
import CreateUser from "./components/CreateUser/CreateUser";
import UpdateUser from "./components/UpdateUser/UpdateUser";

export const MyContext = React.createContext(null);

const App = () => {
  const [tickets, setTickets] = useState([
    {
      Id: 1,
      FlightNumber: 1111,
      ClientId: 1,
      DepartureDate: new Date(2021, 2, 14),
      Price: 1000
    },
    {
      Id: 2,
      FlightNumber: 2222,
      ClientId: 1,
      DepartureDate: new Date(10, 2, 2021),
      Price: 1000
    },
    {
      Id: 3,
      FlightNumber: 3333,
      ClientId: 1,
      DepartureDate: new Date(10, 2, 2021),
      Price: 1200
    },
    {
      Id: 4,
      FlightNumber: 4444,
      ClientId: 2,
      DepartureDate: new Date(10, 2, 2021),
      Price: 300
    },
    {
      Id: 5,
      FlightNumber: 1111,
      ClientId: 2,
      DepartureDate: new Date(2021, 2, 14),
      Price: 1000
    },
    {
      Id: 6,
      FlightNumber: 2222,
      ClientId: 2,
      DepartureDate: new Date(10, 2, 2021),
      Price: 1000
    },
    {
      Id: 7,
      FlightNumber: 3333,
      ClientId: 3,
      DepartureDate: new Date(10, 2, 2021),
      Price: 1200
    },
    {
      Id: 8,
      FlightNumber: 4444,
      ClientId: 3,
      DepartureDate: new Date(10, 2, 2021),
      Price: 300
    },
    {
      Id: 9,
      FlightNumber: 4444,
      ClientId: 4,
      DepartureDate: new Date(2021, 2, 14),
      Price: 1000
    },
    {
      Id: 10,
      FlightNumber: 2222,
      ClientId: 5,
      DepartureDate: new Date(10, 2, 2021),
      Price: 1000
    },
    {
      Id: 11,
      FlightNumber: 3333,
      ClientId: 5,
      DepartureDate: new Date(10, 2, 2021),
      Price: 1200
    },
    {
      Id: 12,
      FlightNumber: 4444,
      ClientId: 5,
      DepartureDate: new Date(10, 2, 2021),
      Price: 300
    }
  ])
  const [users, setUsers] = useState([
    {Id: 1, FullName: 'Zaitsev Maxim', PassportNumber: 'KN123'},
    {Id: 2, FullName: 'Dranev Slavek', PassportNumber: 'KN123'},
    {Id: 3, FullName: 'Sanya', PassportNumber: 'KN123'},
    {Id: 4, FullName: 'Kazarevich Misha', PassportNumber: 'KN123'},
    {Id: 5, FullName: 'Tanya', PassportNumber: 'KN123'}
  ])

  useEffect(() => {
    const requests = async () => {
      const req = await fetch('https://localhost:44320/api/Ticket')
      const newTickets = await req.json()

      const userReq = await fetch('https://localhost:44320/api/Client')
      const newUsers = await userReq.json()

      setTickets(newTickets)
      setUsers(newUsers)
    }
    requests()
  }, [])

  return (
    <div>
      <MyContext.Provider value={{
        tickets, setTickets, users, setUsers
      }}>
        <Layout>
          <Route exact path='/' component={Home} />
          <Route exact path='/new-ticket' component={CreateTicket} />
          <Route exact path='/update-ticket/:id' component={UpdateTicket} />
          <Route exact path='/users' component={Users} />
          <Route exact path='/new-user' component={CreateUser} />
          <Route exact path='/update-user/:id' component={UpdateUser} />
        </Layout>
      </MyContext.Provider>
    </div>
  );
};

export default App;
