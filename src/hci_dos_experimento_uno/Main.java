package hci_dos_experimento_uno;

import musica.Reproductor;
import processing.core.*;

public class Main extends PApplet {

	private Logica logica;
	private Reproductor r;

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		PApplet.main("hci_dos_experimento_uno.Main");
	}

	@Override
	public void settings() {
		size(700, 700,P3D);
	}

	@Override
	public void setup() {
		logica = new Logica(this);
		r = new Reproductor(this);
	}

	@Override
	public void draw() {
		logica.ejecutar(this);

	}

	@Override
	public void mousePressed() {
		r.reproducir_sample(0);
	}

}
