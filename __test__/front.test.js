import React from 'react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import regeneratorRuntime, { async } from 'regenerator-runtime';

import App from '../src/App';
import  RestaurantCard from '../src/components/RestaurantCard';
import SignUp from '../src/components/Signup'; // Corrected import statement
import Login from '../src/components/Login'; // Corrected import statement
import store from '../src/redux/store';

describe('Testing react components', ()=>{

  //testing Sign up page
    describe('SignUp', () => { // Corrected component name
    
        let container;
    
        beforeAll(() => {
          ({ container } = render(<SignUp />)); // Destructuring to get container
        });
    //testing all field are rendered
        test('Renders the SignUp page with all four fields ', () => {
            const firstNameInput = container.querySelector('#firstName');
            const lastNameInput = container.querySelector('#lastName');
            const emailInput = container.querySelector('#email');
            const passwordInput = container.querySelector('#password');
        
            expect(firstNameInput).toBeInTheDocument();
            expect(lastNameInput).toBeInTheDocument();
            expect(emailInput).toBeInTheDocument();
            expect(passwordInput).toBeInTheDocument();
        });
      //testing if signup button calls the handleSubmit event
        test('SignUp button click', async () => {
          const props = {
            handleSubmit: jest.fn()
          };
        
          render(<SignUp {...props} />);
        
          const submitBtn = await screen.querySelector('submitbtn');
          expect(submitBtn.textContent).toBe('Sign Up');
          userEvent.click(submitBtn);
        
          expect(props.handleSubmit).toHaveBeenCalledTimes(1);
        });

        //testing signup button should not be called with empty fields 
        
        xtest('SignUp button disabled if form is invalid', async () => {
          const props = {
            handleSubmit: jest.fn(),
            formData: {
              email: '',
              password: ''
            }
          };
        
          render(<SignUp {...props} />);
        
          const submitBtn = await screen.getByTestId('#submitbtn');
          expect(submitBtn).toBeDisabled();
        });
    });

    //testing login page

    describe('Login', () => { // Corrected component name
    
        let container;
    
        beforeAll(() => {
          ({ container } = render(<Login />)); //
        });
    //testing if input fields are rendered
        test('Renders the Login page with two fields ', () => {

            const emailInput = container.querySelector('#email');
            const passwordInput = container.querySelector('#password');
        
            expect(emailInput).toBeInTheDocument();
            expect(passwordInput).toBeInTheDocument();
        });

        //testing if login handlesubmit gets called if button is clicked
        test('Fire test for button and if event is created ', async() => {
          const data = {
            email : 'testingemail@some.com',
            password: 'testing'
          }
          const props = {
            handleSubmit : jest.fn()
          }
          render(< Login {...props} />)
          userEvent.click(screen.getByTestId('loginBttn'));
          expect(props.handleSubmit).toHaveBeenCalledTimes(1);
      });

      //testing if button should be diable if both fields are empty
      test('Login button disabled if form is invalid', async () => {
        const props = {
          handleSubmit: jest.fn(),
          formData: {
            email: '',
            password: ''
          }
        };
      
        render(<SignUp {...props} />);
      
        const submitBtn = await screen.getByTestId('submitBttn');
        expect(submitBtn).toBeDisabled();
      });
    });



    //testing the main page
    //testing if the data is passed in, if thos events are rendered 

    describe('RestaurantCard', () => {
        const props = {
          info: {
            name: 'Johnny Cakes',
            ambience: 'country',
            cuisine: 'Japanese',
            price_tier: 'splurge',
            plant_based: '1',
            location_radius: 6,
            good_for_groups: '1',
          },
        };
      
        test('Restaurant card should display properly', () => {
          render(<RestaurantCard {...props} />);
      
          expect(screen.getByText('Johnny Cakes')).toBeInTheDocument();
          expect(screen.getByText('Japanese')).toBeInTheDocument();
          expect(screen.getByText('splurge')).toBeInTheDocument();
          // expect(screen.getByText('country')).toBeInTheDocument();
          // expect(screen.getByText('yes')).toBeInTheDocument();
          // expect(screen.getByText(6)).toBeInTheDocument();
          // expect(screen.getByText('yes')).toBeInTheDocument();
        });
      })

      //testing redux component 

      xdescribe('Testing React-redux components', ()=>{

        //testing states are intially empty 
        xdescribe('Empty state before interactions', () => {
          beforeEach(async () => {
            const app = await render(
              <Provider store={store}>
                <App />
              </Provider>
            );
          });




        })
      })
});






