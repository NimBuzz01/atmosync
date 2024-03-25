import torch
from torch import nn
from torchvision.models import resnet34

class AudioClassifier(nn.Module):
    def __init__(self):
        super(AudioClassifier, self).__init__()  # Call the parent class's initializer
        # Check if CUDA is available and set the device accordingly
        if torch.cuda.is_available():
            self.device = torch.device('cuda:0')
        else:
            self.device = torch.device('cpu')
        # Initialize a pre-trained ResNet34 model
        self.model = resnet34(weights='DEFAULT')
        # Replace the last fully connected layer to match the number of classes (10 in this case)
        self.model.fc = nn.Linear(512, 10)
        # Replace the first convolutional layer to accept single-channel (grayscale) images
        self.model.conv1 = nn.Conv2d(1, 64, kernel_size=(7, 7), stride=(2, 2), padding=(3, 3), bias=False)
        # Move the model to the specified device (CPU or GPU)
        self.model = self.model.to(self.device)

    def forward(self, x):
        # Forward pass through the model
        x = self.model(x)
        return x