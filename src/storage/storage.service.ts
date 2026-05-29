import { Injectable, OnModuleInit } from '@nestjs/common';
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, HeadBucketCommand, CreateBucketCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';

@Injectable()
export class StorageService implements OnModuleInit {
    private client: S3Client;

    constructor(private configService: ConfigService) {
        this.client = new S3Client({
            endpoint: this.configService.getOrThrow<string>('MINIO_ENDPOINT'),
            region: 'us-east-1',
            credentials: {
                accessKeyId: this.configService.getOrThrow<string>('MINIO_USER'),
                secretAccessKey: this.configService.getOrThrow<string>('MINIO_PASSWORD'),
            },
            forcePathStyle: true,
        });
    }
    async onModuleInit() {
        await this.ensureBucket('projects');
    }

    private async ensureBucket(bucket: string) {
        try {
            await this.client.send(new HeadBucketCommand({ Bucket: bucket }));
        } catch {
            await this.client.send(new CreateBucketCommand({ Bucket: bucket }));
        }
    }
    async upload(bucket: string, key: string, body: Buffer, mimetype: string) {
        await this.client.send(new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: body,
            ContentType: mimetype,
        }));

        return `http://localhost:9000/${bucket}/${key}`;
    }
    async delete(bucket: string, key: string): Promise<void> {
        await this.client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
    }
    async get(bucket: string, key: string): Promise<Readable> {
        const res = await this.client.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
        return res.Body as Readable;
    }
}