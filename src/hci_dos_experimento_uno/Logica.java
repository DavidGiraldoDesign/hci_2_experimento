package hci_dos_experimento_uno;

import java.util.LinkedList;
import java.util.Observable;
import java.util.Observer;

import processing.core.PApplet;

public class Logica implements Observer {
	private LinkedList<Cabra> cabras = new LinkedList<Cabra>();
	private int valor_fotoCelda;
	private int r = 0;
	PApplet p;

	public Logica(PApplet p) {
		this.p = p;
		// SerialCom.getRef().addObserver(this);
		// new Thread(SerialCom.getRef()).start();
		this.valor_fotoCelda = 0;

		for (int i = 0; i < 50; i++) {
			Cabra b = new Cabra(p);
			b.start();
			cabras.add(b);
		}

	}

	@Override
	public void update(Observable o, Object arg) {
		// TODO Auto-generated method stub
		valor_fotoCelda = (int) arg;
	}

	public void ejecutar(PApplet p) {
		// TODO Auto-generated method stub
		System.out.println("Valor de foto celda: " + valor_fotoCelda);
		p.background(0);
		r = (int) PApplet.map(valor_fotoCelda, 0, 1023, 0, 300);
		p.ellipse(p.width / 2, p.height / 2, r, r);

		for (Cabra m : cabras) {
			m.display();

		}

	}

}
