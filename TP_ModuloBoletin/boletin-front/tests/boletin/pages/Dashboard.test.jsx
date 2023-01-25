import { fireEvent, render, screen } from "@testing-library/react";
import { Dashboard } from "../../../src/boletin/pages/Dashboard";

describe('Pruebas en <Dashboard />', () => { 

    test('El dashboard debe tener una etiqueta h1 que lo indique', () => { 


        render(<Dashboard/>); //Se renderiza la pagina

        screen.debug(); //Con esto mostras toda la pagina que renderizas

        expect(screen.getByText('Dashboard')).toBeTruthy(); //La palabra "Dashboard" debe de existir

     });


 });