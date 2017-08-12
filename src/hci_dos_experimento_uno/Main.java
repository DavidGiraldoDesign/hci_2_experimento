package hci_dos_experimento_uno;

import processing.core.*;

public class Main extends PApplet {

	private Logica logica;

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		PApplet.main("hci_dos_experimento_uno.Main");
	}

	@Override
	public void settings() {
		size(700, 700);
	}

	@Override
	public void setup() {
		logica = new Logica(this);

	}

	@Override
	public void draw() {
		logica.ejecutar(this);

	}

}
