package hci_dos_experimento_uno;

import java.util.LinkedList;

import processing.core.PApplet;

public class Potrero {

	private PApplet p;
	private LinkedList<Pasto> pastos = new LinkedList<Pasto>();

	private int var = 10000;

	public Potrero(PApplet p) {
		this.p = p;

	}

	private class Pasto extends Thread {
		private int x, y, radio, r, g, b, t;

		public Pasto(int x, int y, int radio) {
			this.x = x;
			this.y = y;
			this.radio = radio;
			r = 110;
			g = 210;
			b = 40;
		}

		public void setTransparencia(int t) {
			// TODO Auto-generated method stub
			this.t = t;
		}

		public void pintar() {
			p.fill(r, g, b, t);
			p.ellipse(x, y, radio, radio);
		}

	}

}
