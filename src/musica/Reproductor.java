package musica;

import ddf.minim.*;
import processing.core.PApplet;

public class Reproductor {

	private Minim minim;
	private AudioPlayer[] cancion = new AudioPlayer[6];
	private AudioSample[] sample = new AudioSample[2];

	public Reproductor(PApplet app) {

		minim = new Minim(app);

		sample[0] = minim.loadSample("sonidos/goat_nace.wav", 1024);

	}

	public void reproducir_sample(int cual) {
		sample[cual].trigger();

	}

	public void reproducir(int cual) {

		if (cancion[cual].isPlaying() == false) {
			cancion[cual].play();
		}
		if (cancion[cual].position() == cancion[cual].length()) {
			cancion[cual].pause();
			cancion[cual].rewind();
		}

	}

	public void pausar(int cual) {

		if (cancion[cual].isPlaying() == true) {
			cancion[cual].pause();
		}
	}

	public void stop(int cual) {

		cancion[cual].pause();
		cancion[cual].rewind();
	}

}
