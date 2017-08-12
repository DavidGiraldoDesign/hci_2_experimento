package hci_dos_experimento_uno;

import java.util.LinkedList;

import processing.core.PApplet;
import processing.core.PVector;

public class Cabra extends Thread {
	private PApplet p;
	private PVector location;
	private PVector velocity;
	private PVector acceleration;
	private PVector direccion;

	private float topspeed;
	private int cambio;
	private int t, r, g, b;
	private LinkedList<ColaDeCabra> cola = new LinkedList<ColaDeCabra>();

	public Cabra(PApplet p) {
		this.p = p;
		location = new PVector(p.width / 2, p.height / 2);
		velocity = new PVector(0, 0);
		direccion = new PVector(p.random(p.width), p.random(p.height));
		topspeed = (int) p.random(1, 5);
		cambio = (int) p.random(10, 100);

		this.r = 0; // :v
		this.g = 250;
		this.b = 240;

	}

	private class ColaDeCabra {

		private float x, y, d;
		private int r, g, b;

		public ColaDeCabra(float x, float y, float d, int r, int g, int b) {
			this.x = x;
			this.y = y;
			this.d = d;

			this.r = r;
			this.g = g;
			this.b = b;
		}

		public void pintar() {
			p.noStroke();
			p.fill(r, g, b, t);
			p.ellipse(x, y, d, d);
		}

		public void encoger() {

			if (p.frameCount % 1 == 0) {
				this.d -= 1;
			}
			// this.t -= 5;
			t = 100;
		}

	}

	public void run() {
		while (true) {

			try {
				update();
				sleep(25);
			} catch (Exception e) {
			}
		}
	}

	void update() {

		// Compute a vector that points from location to mouse

		if (p.frameCount % cambio == 0) {
			direccion = new PVector(p.random(p.width), p.random(p.height));
		}

		acceleration = PVector.sub(direccion, location);
		// Set magnitude of acceleration
		acceleration.setMag((float) 0.1);
		// Velocity changes according to acceleration
		velocity.add(acceleration);
		// Limit the velocity by topspeed
		velocity.limit(topspeed);
		// Location changes by velocity
		location.add(velocity);
	}

	public float getX() {
		return location.x;
	}

	public float getY() {
		return location.y;
	}

	void display() {
		p.noStroke();
		p.fill(r, g, b, 100);
		p.ellipse(location.x, location.y, 30, 30);

		if (p.frameCount % 1 == 0) {
			cola.add(new ColaDeCabra(getX(), getY(), 30, r, g, b));
		}
		if (cola.size() > 30) {
			cola.removeFirst();
		}

		for (ColaDeCabra e : cola) {
			e.pintar();
			e.encoger();
		}
	}
}
