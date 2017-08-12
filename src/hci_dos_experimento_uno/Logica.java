package hci_dos_experimento_uno;

import java.util.LinkedList;
import java.util.Observable;
import java.util.Observer;

import comunicacion_serial.SerialCom;
import processing.core.PApplet;

public class Logica implements Observer {

	private int valor_fotoCelda;
	private int r = 0;
	private PApplet p;
	private Potrero potrero;

	public Logica(PApplet p) {
		this.p = p;
		// SerialCom.getRef().addObserver(this);
		// new Thread(SerialCom.getRef()).start();
		this.valor_fotoCelda = 0;
		potrero = new Potrero(p);

	}

	@Override
	public void update(Observable o, Object arg) {
		// TODO Auto-generated method stub
		valor_fotoCelda = (int) arg;
	}

	public void ejecutar(PApplet p) {
		// TODO Auto-generated method stub
		// System.out.println("Valor de foto celda: " + valor_fotoCelda);
		p.background(230, 220, 200);
		r = (int) PApplet.map(valor_fotoCelda, 0, 1023, 0, 300);
		p.ellipse(p.width / 2, p.height / 2, r, r);

		potrero.ejecutar();

	}

}
