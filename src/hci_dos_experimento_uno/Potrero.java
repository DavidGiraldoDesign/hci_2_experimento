package hci_dos_experimento_uno;

import java.util.LinkedList;

import processing.core.PApplet;

public class Potrero {

	private PApplet p;
	private LinkedList<Cabra> cabras = new LinkedList<Cabra>();
	private LinkedList<Pasto> pastos = new LinkedList<Pasto>();
	private int num_pastos;
	private int energia = 10000;
	int menos = 1;

	public Potrero(PApplet p) {
		this.p = p;
		/*-------------------Cabras---------------------*/
		for (int i = 0; i < 50; i++) {
			Cabra b = new Cabra(p);
			b.start();
			cabras.add(b);
		}
		/*-------------------Cabras---------------------*/
		/*-------------Pastos-------------*/
		num_pastos = (int) PApplet.map(energia, 0, 10000, 0, 800);
		for (int i = 0; i < num_pastos; i++) {
			int x = (int) p.random(0, p.width);
			int y = (int) p.random(0, p.height);
			int radio = (int) p.random(10, 30);
			pastos.add(new Pasto(x, y, radio));

		}
		/*-------------Pastos-------------*/

	}

	public void ejecutar() {
		for (Pasto pasto : pastos) {
			pasto.pintar();
			pasto.viento();
		}
		for (Cabra m : cabras) {
			m.display();
		}

	}

	private class Pasto {

		private int t, x, y, radio, r, g, b;
		private double onda, indice, amplitud, suma;
		private boolean muerto;

		public Pasto(int x, int y, int radio) {
			this.x = x;
			this.y = y;
			this.radio = radio;
			r = 35;
			g = 200;
			b = 30;
			t = 100;
			amplitud = p.random(3, 10);
			suma = p.random((float) 0.01, (float) 0.1);
			indice = 0.1;
			muerto = false;
		}

		public void desvanecer(int t) {
			this.t = t;
		}

		public void agotar(int gasto) {
			if (muerto == false) {
				this.radio -= gasto;
				if (radio <= 5) {
					muerto = true;
				}
			}
		}

		public boolean isMuerto() {
			return muerto;
		}

		public void viento() {
			indice += suma;
			onda = (float) PApplet.sin((float) indice) * amplitud;
		}

		public void pintar() {
			p.fill(r, g, b, t);
			p.noStroke();
			p.ellipse((float) (x + onda), y, radio, radio);
		}

	}

}
