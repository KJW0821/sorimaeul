package com.usagi.sorimaeul.utils;

import com.jcraft.jsch.*;

public class SCPUploader {
    public void uploadFile(String host, int port, String username, String password, String sourceFilePath, String destinationFilePath) {
        Session session = null;
        try {
            JSch jsch = new JSch();
            session = jsch.getSession(username, host, port);
            session.setPassword(password);
            session.setConfig("StrictHostKeyChecking", "no");
            session.connect();

            Channel channel = session.openChannel("sftp");
            channel.connect();
            ChannelSftp sftpChannel = (ChannelSftp) channel;

            sftpChannel.put(sourceFilePath, destinationFilePath);

            sftpChannel.exit();
            session.disconnect();
            System.out.println("File uploaded successfully!");
        } catch (JSchException | SftpException e) {
            e.printStackTrace();
        } finally {
            if (session != null && session.isConnected()) {
                session.disconnect();
            }
        }
    }
}
