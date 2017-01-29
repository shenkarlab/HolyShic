package com.goldbergtom.files;

import java.io.*;

// TheOldTestament.txt parser java file
public class programNewTestament {

	public static void main(String[] args) throws Exception{
		FileWriter fw = new FileWriter("TheOldTestamentResult.txt");;
		PrintWriter pw = new PrintWriter(fw);

		FileReader fr = new FileReader("TheOldTestament.txt");
		BufferedReader reader = new BufferedReader(fr);

		String line;
		String[] sep;
		line = reader.readLine();

		while(line != null){
			sep = line.split(" +");
			for(int i=0 ; i < sep.length ; i++){
				if( i > 0 && sep[i-1].length() > 0 && sep[i].length() > 0 && Character.isDigit( sep[i].charAt(0) ) ){
					System.out.print("\n\n");
					pw.write("\n\n");
				}
				System.out.print(sep[i]+" ");
				pw.print(sep[i]+" ");
			}
			System.out.println();
			pw.append(System.lineSeparator());

			line = reader.readLine();
		}

		reader.close();
		pw.close();
	}
}
