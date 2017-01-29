package com.goldbergtom.files;

import java.io.*;
import java.util.regex.*;

// qoran.txt parser java file
public class programQoran {

	public static void main(String[] args) throws Exception{

		final String book = "[Book ";
		int bookcount = 0;
	    String pattern = "[0-9]+";
	    Pattern r = Pattern.compile(pattern);

	    FileWriter fw = new FileWriter("QoranResult.txt");;
		PrintWriter pw = new PrintWriter(fw);

		FileReader fr = new FileReader("qoran.txt");
		BufferedReader reader = new BufferedReader(fr);

		String line;
		String[] sep;
		line = reader.readLine();
		Matcher m = r.matcher(line);
		m.find();
		boolean flag1 = true , flag2 = true , flag3=true;


		sep = line.split(" ");
		while( line != null)
		{
			sep = line.split(" ");
			for(int i=0 ; i< sep.length-1 ; i++){
				for(int j=0 ; j < sep[i].length() ; j++){
					if ( flag2 && !Character.isDigit(sep[i].charAt(j)  )){
						if(flag1){
							pw.write(":");
							System.out.print(":");
							flag1 = !flag1;
						} else{
							pw.write(" ");
							System.out.print(" ");
							flag2 = !flag2;
						}
					}
					else {

						if( bookcount < Integer.parseInt(m.group(0))   ){
							if(flag3){
								pw.write("\n\n"+book+(++bookcount)+"]\n\n");
								System.out.println("\n\n"+book+(bookcount)+"]\n\n");
								flag3 = !flag3;
							}else{
								pw.write("\n\n"+book+(++bookcount)+"]\n\n");
								System.out.println("\n\n"+book+(bookcount)+"]\n\n");
								flag3 = !flag3;
							}
						}
						pw.write(sep[i].charAt(j));
						System.out.print(sep[i].charAt(j));
					}
				}
				pw.write(" "+sep[i+1]+" ");
				System.out.print(" "+sep[i+1]+" ");
				i++;
			}
			pw.write("\n");
			System.out.println();
			flag1 = !flag1;
			flag2 = !flag2;
			line = reader.readLine();
			try{
				m = r.matcher(line);
			} catch(NullPointerException e){
				e.printStackTrace();
			}
			m.find();
		}


		reader.close();
		pw.close();
	}

}
